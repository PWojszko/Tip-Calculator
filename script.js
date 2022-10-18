//get all elements
const billInput = document.getElementById("bill");
const NumberOfPeopleInput = document.getElementById("people");
const buttonTip5 = document.getElementById("5");
const buttonTip10 = document.getElementById("10");
const buttonTip15 = document.getElementById("15");
const buttonTip25 = document.getElementById("25");
const buttonTip50 = document.getElementById("50");
const buttonTipCustom = document.getElementById("custom");
const tipAmount = document.getElementById("tip");
const totalAmount = document.getElementById("total");
const resetButton = document.getElementById("reset");
const tipButtons = document.querySelectorAll(".btn-tip");
const activeBtn = document.querySelector(".active");
// variables
const resetBill = (billInput.value = "");
const resetNumberOfPeople = (NumberOfPeopleInput.value = "");
const resetButtonTip = (buttonTipCustom.value = "");
const resetTotalAmount = (totalAmount.textContent = "$0.00");
const resetTipAmount = (tipAmount.textContent = "$0.00");
const resetCustomTip = (buttonTipCustom.value = "");
const btns = [buttonTip5, buttonTip10, buttonTip15, buttonTip25, buttonTip50];
const people = NumberOfPeopleInput.value;
const customBtnActive =
  buttonTipCustom.classList.contains("active--custom") === true;

//Bill value
const updateTotalValue = () => {
  if (!!billInput.value && billInput.value !== ".") {
    total();
  } else {
    setTotalDefault();
    resetTipButtons();
  }
};

// The total bill to be paid
const total = () => {
  //only button tip
  if (
    !billWithoutTip() &&
    NumberOfPeopleInput.value === "" &&
    !buttonTipCustom.classList.contains("active--custom")
  ) {
    buttonsTipPercentages();

    //only tip custom
  } else if (
    buttonTipCustom.classList.contains("active--custom") &&
    NumberOfPeopleInput.value === ""
  ) {
    totalWithCustomTip();
  }

  //bill without tip but ppl selected
  else if (NumberOfPeopleInput.value !== "" && !checkForNullsInNOP()) {
    totalWithNumberOfPerson();
  } else if (checkForNullsInNOP()) {
    setTotalDefault();
  } else {
    totalEqualBill();
  }

  maxNumberOfDigits();
  smallerTotalFontSize();
  tipPerPerson();
};

//Count depending on which button is selected, and reset tip custom
const buttonsTipPercentages = () => {
  tipButtons.forEach((btn) => {
    if (btn.classList.contains("active")) {
      buttonTipCustom.classList.remove("active--custom");
      buttonTipCustom.value = resetCustomTip;
    }
  });
  if (btns[0].classList.contains("active")) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (5 / 100))
    ).toFixed(2)}`;
  } else if (btns[1].classList.contains("active")) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (10 / 100))
    ).toFixed(2)}`;
  } else if (btns[2].classList.contains("active")) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (15 / 100))
    ).toFixed(2)}`;
  } else if (btns[3].classList.contains("active")) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (25 / 100))
    ).toFixed(2)}`;
  } else if (btns[4].classList.contains("active")) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (50 / 100))
    ).toFixed(2)}`;
  }
};
//Bill is without any tip
const billWithoutTip = () => {
  let isTipButtonSelected = btns.filter((btn) =>
    btn.classList.contains("active")
  );

  let isCustomTipSelected =
    buttonTipCustom.classList.contains("active--custom");

  let noTip = isTipButtonSelected.length === 0 && isCustomTipSelected !== true;
  return noTip;
};

//Bill with ButtonTip : NumberOfPeopole
const WhichButtonTipSelected = () => {
  btns[0].classList.contains("active")
    ? (totalAmount.textContent = `$${(
        (Number(billInput.value) + Number(billInput.value * (5 / 100))) /
        Number(NumberOfPeopleInput.value)
      ).toFixed(2)}`)
    : btns[1].classList.contains("active")
    ? (totalAmount.textContent = `$${(
        (Number(billInput.value) + Number(billInput.value * (10 / 100))) /
        Number(NumberOfPeopleInput.value)
      ).toFixed(2)}`)
    : btns[2].classList.contains("active")
    ? (totalAmount.textContent = `$${(
        (Number(billInput.value) + Number(billInput.value * (15 / 100))) /
        Number(NumberOfPeopleInput.value)
      ).toFixed(2)}`)
    : btns[3].classList.contains("active")
    ? (totalAmount.textContent = `$${(
        (Number(billInput.value) + Number(billInput.value * (25 / 100))) /
        Number(NumberOfPeopleInput.value)
      ).toFixed(2)}`)
    : (totalAmount.textContent = `$${(
        (Number(billInput.value) + Number(billInput.value * (50 / 100))) /
        Number(NumberOfPeopleInput.value)
      ).toFixed(2)}`);
};

//Bill with CustomTip : NumberOfPeopole
const customTipSelected = () => {
  totalAmount.textContent = `$${(
    (Number(billInput.value) +
      Number((billInput.value * buttonTipCustom.value) / 100)) /
    Number(NumberOfPeopleInput.value)
  ).toFixed(2)}`;
};

//Custom tip: count bill and remove classess from btn and add custom class for yourself
const totalWithCustomTip = () => {
  resetTipButtons();
  buttonTipCustom.classList.add("active--custom");
  if (
    buttonTipCustom.value !== "" &&
    billInput.value !== "" &&
    NumberOfPeopleInput.value !== "" &&
    !checkForNullsInNOP()
  ) {
    tipPerPerson();
    customTipSelected();
  } else if (
    buttonTipCustom.value !== "" &&
    billInput.value !== "" &&
    NumberOfPeopleInput.value === ""
  ) {
    totalAmount.textContent = `$${(
      Number(billInput.value) +
      Number((billInput.value * buttonTipCustom.value) / 100)
    ).toFixed(2)}`;
  } else if (
    NumberOfPeopleInput.value !== "" &&
    buttonTipCustom.value === "" &&
    billInput.value !== ""
  ) {
    buttonTipCustom.classList.remove("active--custom");
    totalWithNumberOfPerson();
  } else if (
    checkForNullsInNOP() &&
    buttonTipCustom.value !== "" &&
    billInput.value !== ""
  ) {
    setTotalDefault();
  } else {
    buttonTipCustom.classList.remove("active--custom");
    totalEqualBill();
  }
  maxNumberOfDigits();
  smallerTotalFontSize();
};
buttonTipCustom.addEventListener("click", totalWithCustomTip);

//divides depending on the number of people
const totalWithNumberOfPerson = () => {
  maxNumberOfDigits();
  smallerTotalFontSize();
  tipPerPerson();

  if (!billInput.value && !NumberOfPeopleInput.value) {
    removeNaN();
  }
  //no tip
  if (billWithoutTip() && !!NumberOfPeopleInput.value) {
    totalAmount.textContent = `$${(
      Number(billInput.value) / Number(NumberOfPeopleInput.value)
    ).toFixed(2)}`;
  } else if (billWithoutTip() && !NumberOfPeopleInput.value) {
    totalEqualBill();
  }

  //tip selected but ppl not yet
  if (
    !billWithoutTip() &&
    !NumberOfPeopleInput.value &&
    btns[0].classList.contains("active")
  ) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (5 / 100))
    ).toFixed(2)}`;
  } else if (
    !billWithoutTip() &&
    !NumberOfPeopleInput.value &&
    btns[1].classList.contains("active")
  ) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (10 / 100))
    ).toFixed(2)}`;
  } else if (
    !billWithoutTip() &&
    !NumberOfPeopleInput.value &&
    btns[2].classList.contains("active")
  ) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (15 / 100))
    ).toFixed(2)}`;
  } else if (
    !billWithoutTip() &&
    !NumberOfPeopleInput.value &&
    btns[3].classList.contains("active")
  ) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (25 / 100))
    ).toFixed(2)}`;
  } else if (
    !billWithoutTip() &&
    !NumberOfPeopleInput.value &&
    btns[4].classList.contains("active")
  ) {
    totalAmount.textContent = `$${(
      Number(billInput.value) + Number(billInput.value * (50 / 100))
    ).toFixed(2)}`;
  } else if (
    !billWithoutTip() &&
    !NumberOfPeopleInput.value &&
    buttonTipCustom.classList.contains("active--custom")
  ) {
    totalWithCustomTip();
  }

  // Custom TIP => jeśli jest wybrany i mamy już wybraną ilośc ludzi
  if (
    !billWithoutTip() &&
    !!NumberOfPeopleInput.value &&
    !!buttonTipCustom.value
  ) {
    customTipSelected();
  }

  //Button TIPS => jeśli jest przycisk wybrany i mamy już wybraną ilośc ludzi
  if (
    !billWithoutTip() &&
    !!NumberOfPeopleInput.value &&
    !buttonTipCustom.value
  ) {
    WhichButtonTipSelected();
  }
  NOP0();
};

// if bill doesn't exist and you click on NOP Input, set total to default $0.00
const removeNaN = () => setTotalDefault();

// if bill exist and you click on NOP Input, keep total equal to bill value
const totalEqualBill = () => {
  totalAmount.textContent = `$${Number(billInput.value).toFixed(2)}`;
};

NumberOfPeopleInput.addEventListener("click", totalWithNumberOfPerson);

//Pass active class throught elements && Bill included tip, without number of people
//* a lot of recurring code
const btn5Active = () => {
  if (billInput.value === "") {
    setTotalDefault();
  } else if (
    NumberOfPeopleInput.value !== "" &&
    buttonTip5.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip5.classList.add("active");
    buttonTip10.classList.remove("active");
    buttonTip15.classList.remove("active");
    buttonTip25.classList.remove("active");
    buttonTip50.classList.remove("active");
    maxNumberOfDigits();
    smallerTotalFontSize();
    WhichButtonTipSelected();
    tipPerPerson();
  } else if (
    buttonTip5.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip5.classList.add("active");
    buttonTip10.classList.remove("active");
    buttonTip15.classList.remove("active");
    buttonTip25.classList.remove("active");
    buttonTip50.classList.remove("active");
    buttonsTipPercentages();
    maxNumberOfDigits();
    smallerTotalFontSize();
    tipPerPerson();
  } else {
    buttonTip5.classList.remove("active");
    total();
  }
};
const btn10Active = () => {
  if (billInput.value === "") {
    setTotalDefault();
  } else if (
    NumberOfPeopleInput.value !== "" &&
    buttonTip10.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip10.classList.add("active");
    buttonTip5.classList.remove("active");
    buttonTip15.classList.remove("active");
    buttonTip25.classList.remove("active");
    buttonTip50.classList.remove("active");
    maxNumberOfDigits();
    smallerTotalFontSize();
    WhichButtonTipSelected();
    tipPerPerson();
  } else if (
    buttonTip10.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip10.classList.add("active");
    buttonTip5.classList.remove("active");
    buttonTip15.classList.remove("active");
    buttonTip25.classList.remove("active");
    buttonTip50.classList.remove("active");
    buttonsTipPercentages();
    maxNumberOfDigits();
    smallerTotalFontSize();
    tipPerPerson();
  } else {
    buttonTip10.classList.remove("active");
    total();
  }
};
const btn15Active = () => {
  if (billInput.value === "") {
    setTotalDefault();
  } else if (
    NumberOfPeopleInput.value !== "" &&
    buttonTip15.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip15.classList.add("active");
    buttonTip10.classList.remove("active");
    buttonTip5.classList.remove("active");
    buttonTip25.classList.remove("active");
    buttonTip50.classList.remove("active");
    maxNumberOfDigits();
    smallerTotalFontSize();
    WhichButtonTipSelected();
    tipPerPerson();
  } else if (
    buttonTip15.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip15.classList.add("active");
    buttonTip10.classList.remove("active");
    buttonTip5.classList.remove("active");
    buttonTip25.classList.remove("active");
    buttonTip50.classList.remove("active");
    buttonsTipPercentages();
    maxNumberOfDigits();
    smallerTotalFontSize();
    tipPerPerson();
  } else {
    buttonTip15.classList.remove("active");
    total();
  }
};
const btn25Active = () => {
  if (billInput.value === "") {
    setTotalDefault();
  } else if (
    NumberOfPeopleInput.value !== "" &&
    buttonTip25.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip25.classList.add("active");
    buttonTip10.classList.remove("active");
    buttonTip15.classList.remove("active");
    buttonTip5.classList.remove("active");
    buttonTip50.classList.remove("active");
    maxNumberOfDigits();
    smallerTotalFontSize();
    WhichButtonTipSelected();
    tipPerPerson();
  } else if (
    buttonTip25.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip25.classList.add("active");
    buttonTip10.classList.remove("active");
    buttonTip15.classList.remove("active");
    buttonTip5.classList.remove("active");
    buttonTip50.classList.remove("active");
    buttonsTipPercentages();
    maxNumberOfDigits();
    smallerTotalFontSize();
    tipPerPerson();
  } else {
    buttonTip25.classList.remove("active");
    total();
  }
};
const btn50Active = () => {
  if (billInput.value === "") {
    setTotalDefault();
  } else if (
    NumberOfPeopleInput.value !== "" &&
    buttonTip50.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip50.classList.add("active");
    buttonTip10.classList.remove("active");
    buttonTip15.classList.remove("active");
    buttonTip25.classList.remove("active");
    buttonTip5.classList.remove("active");
    maxNumberOfDigits();
    smallerTotalFontSize();
    WhichButtonTipSelected();
    tipPerPerson();
  } else if (
    buttonTip50.classList.contains("active") == !true &&
    !checkForNullsInNOP()
  ) {
    buttonTip50.classList.add("active");
    buttonTip10.classList.remove("active");
    buttonTip15.classList.remove("active");
    buttonTip25.classList.remove("active");
    buttonTip5.classList.remove("active");
    buttonsTipPercentages();
    maxNumberOfDigits();
    smallerTotalFontSize();
    tipPerPerson();
  } else {
    buttonTip50.classList.remove("active");
    total();
  }
};
buttonTip5.addEventListener("click", btn5Active);
buttonTip10.addEventListener("click", btn10Active);
buttonTip15.addEventListener("click", btn15Active);
buttonTip25.addEventListener("click", btn25Active);
buttonTip50.addEventListener("click", btn50Active);

//remove active class if reset
const resetTipButtons = () =>
  tipButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

// change fontSize of total input if is too long
const smallerTotalFontSize = () => {
  if (
    totalAmount.textContent.length >= 10 ||
    tipAmount.textContent.length >= 9
  ) {
    tipAmount.classList.add("cost-small");
    totalAmount.classList.add("cost-small");
  } else {
    totalAmount.classList.remove("cost-small");
    tipAmount.classList.remove("cost-small");
  }
};

// sets the maximum length equal to 8 for bill&total
const maxNumberOfDigits = () => {
  if (
    totalAmount.textContent.length > 11 ||
    billInput.value.length > 10 ||
    tipAmount.textContent.length > 10
  ) {
    totalAmount.textContent = totalAmount.textContent.substring(0, 11);
    tipAmount.textContent = tipAmount.textContent.substring(0, 10);
    billInput.value = billInput.value.slice(0, 10);
  }
};

//reset All
const reset = () => {
  billInput.value = "";
  NumberOfPeopleInput.value = "";
  buttonTipCustom.value = "";
  setTotalDefault();
  buttonTipCustom.classList.remove("active--custom");
  tipAmount.textContent = "$0.00";
  resetTipButtons();
  totalAmount.classList.remove("cost-small");
  tipAmount.classList.remove("cost-small");
  NumberOfPeopleInput.classList.remove("warning");
  removeWarningInfo();
};
resetButton.addEventListener("click", reset);

//check if NOP is not 0
const NOP0 = () => {
  if (!isFinite(Number(totalAmount.textContent.substring(1)))) {
    removeNaN();
    createWarningInfo();
    NumberOfPeopleInput.classList.add("warning");
  } else {
    removeWarningInfo();
    NumberOfPeopleInput.classList.remove("warning");
  }
};

// If number of people input is 0 create warning text
const createWarningInfo = () => {
  const warningShow = document.createElement("p");
  const warningText = document.createTextNode("Can't be zero");
  warningShow.className = "people__warning info--error";
  warningShow.appendChild(warningText);
  const numberOfPeopleText = document.querySelector(".people__nop");
  numberOfPeopleText.className = "people__nop info--error";
  const container = document.querySelector(".people__text");
  const oneError = document.querySelectorAll(".people__warning");

  //prevent from creating multiple text errors
  if (oneError.length < 1) {
    container.insertBefore(warningShow, numberOfPeopleText.nextSibling);
  }
};

const removeWarningInfo = () => {
  const removeText = document.querySelector(".people__warning");
  //prevent from trying to remove element, if it doesn't exist yet
  if (removeText !== null) {
    removeText.remove();
  }
};

//reset Total value to default
const setTotalDefault = () => {
  totalAmount.textContent = "$0.00";
  tipAmount.textContent = "$0.00";
};

//if NOP is 0 and you click to button tip, prevent from Infinity
const removeInfinityFromButtons = () => {
  if (!billWithoutTip() && checkForNullsInNOP()) {
    buttonTipCustom.classList.remove("active--custom");
    setTotalDefault();
  }
};

//check if can count any tip
const tipPerPerson = () => {
  !!NumberOfPeopleInput.value && !checkForNullsInNOP() && !billWithoutTip()
    ? totalTipAmount()
    : setTipDefault();
};

const setTipDefault = () => (tipAmount.textContent = "$0.00");

//checking what the value of a tip is per person
const totalTipAmount = () => {
  if (btns[0].classList.contains("active")) {
    tipAmount.textContent = `$${(
      (Number(billInput.value) * (5 / 100)) /
      Number(NumberOfPeopleInput.value)
    ).toFixed(2)}`;
  } else if (btns[1].classList.contains("active")) {
    tipAmount.textContent = `$${(
      (Number(billInput.value) * (10 / 100)) /
      Number(NumberOfPeopleInput.value)
    ).toFixed(2)}`;
  } else if (btns[2].classList.contains("active")) {
    tipAmount.textContent = `$${(
      (Number(billInput.value) * (15 / 100)) /
      Number(NumberOfPeopleInput.value)
    ).toFixed(2)}`;
  } else if (btns[3].classList.contains("active")) {
    tipAmount.textContent = `$${(
      (Number(billInput.value) * (25 / 100)) /
      Number(NumberOfPeopleInput.value)
    ).toFixed(2)}`;
  } else if (btns[4].classList.contains("active")) {
    tipAmount.textContent = `$${(
      (Number(billInput.value) * (50 / 100)) /
      Number(NumberOfPeopleInput.value)
    ).toFixed(2)}`;
  } else {
    tipAmount.textContent = `$${(
      Number((billInput.value * buttonTipCustom.value) / 100) /
      Number(NumberOfPeopleInput.value)
    ).toFixed(2)}`;
  }
};

const checkForNullsInNOP = () =>
  NumberOfPeopleInput.value === "0" ||
  NumberOfPeopleInput.value === "00" ||
  NumberOfPeopleInput.value === "000"
    ? true
    : false;
