const selectedAmountInputQuery = document.querySelector("#bill");
const tipButtonsQuery = document.querySelectorAll(".tip__buttons .btn-tip");
const customTipQuery = document.querySelector(".tip__buttons #custom");
const numberOfPeopleQuery = document.querySelector("#people");
const tipQuery = document.querySelector("#tip");
const totalQuery = document.querySelector("#total");
const resetQuery = document.querySelector("#reset");

// Btns value
document.querySelector(".btn-tip-5").value = 5;
document.querySelector(".btn-tip-10").value = 10;
document.querySelector(".btn-tip-15").value = 15;
document.querySelector(".btn-tip-25").value = 25;
document.querySelector(".btn-tip-50").value = 50;

// States
let selectedAmount;
let selectedTip;
let numberOfPeople;
let tipPerPerson;
let totalPerPerson;

// Handlers
const handleSelectAmount = (e) => {
  selectedAmount = Number(e.target.value);
  render();
};

const handleSelectTip = (e, actionType) => {
  selectedTip = Number(e.target.value);
  if (actionType === "button") {
    customTipQuery.value = null;
  }
  render();
};

const selectedNumberOfPeople = (e) => {
  numberOfPeople = Number(e.target.value);
  render();
};

const handleReset = () => {
  selectedAmount =
    selectedTip =
    numberOfPeople =
    tipPerPerson =
    totalPerPerson =
      0;

  render("reset");
};

const handleTipAmount = () => {
  if (numberOfPeople)
    tipPerPerson = Number(
      (selectedAmount * (selectedTip / 100)) / numberOfPeople
    );
};

const handleTotalAmount = () => {
  if (numberOfPeople)
    totalPerPerson = Number(
      (selectedAmount + selectedAmount * (selectedTip / 100)) / numberOfPeople
    );
};

const render = (actionType) => {
  handleTipAmount();
  handleTotalAmount();
  selectedAmountInputQuery.value = selectedAmount ? selectedAmount : null;
  numberOfPeopleQuery.value = numberOfPeople ? numberOfPeople : null;
  tipQuery.innerText = tipPerPerson ? tipPerPerson.toFixed(2) : "0.00";
  totalQuery.innerText = totalPerPerson ? totalPerPerson.toFixed(2) : "0.00";

  if (actionType === "reset") customTipQuery.value = null;
};

// Event listeners
selectedAmountInputQuery.addEventListener("input", handleSelectAmount);
tipButtonsQuery.forEach((btn) =>
  btn.addEventListener("click", (e) => handleSelectTip(e, "button"))
);
customTipQuery.addEventListener("input", (e) => handleSelectTip(e, "input"));
numberOfPeopleQuery.addEventListener("input", selectedNumberOfPeople);
resetQuery.addEventListener("click", handleReset);
