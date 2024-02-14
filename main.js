const Operation = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2  
}

const operate = (num1, num2, operation) => Operation[operation](num1, num2);

let num1 = null, num2 = null;
let finishedTyping = false;
let waitingForEqual = false;
let lastClickWasOperation = false;
let operation = null;

const screen = document.querySelector(".screen");

const numbers = document.querySelectorAll(".number");
numbers.forEach(element => {
  element.addEventListener("click", () => {
    if(finishedTyping) {
      screen.textContent = "";
      finishedTyping = false; 
    }
    if(screen.textContent == "0")
      screen.textContent = "";
    screen.textContent += element.textContent;
    lastClickWasOperation = false;
  })
});

const operations = document.querySelectorAll(".operation");
operations.forEach(element => {
  element.classList.forEach(className => {
    if(className != "operation")
      element.addEventListener("click", () => {
        if(lastClickWasOperation) {
          operation = className;
          return;
        }
        if(waitingForEqual) {
          num2 = Number(screen.textContent);
          screen.textContent = operate(num1, num2, operation);
          num1 = Number(screen.textContent);
          waitingForEqual = false;
        }
        num1 = Number(screen.textContent);
        finishedTyping = true;
        waitingForEqual = true;
        lastClickWasOperation = true;
        operation = className;
      })
  });
});

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  num2 = Number(screen.textContent);
  screen.textContent = operate(num1, num2, operation);
  num1 = Number(screen.textContent);
  finishedTyping = true;
  waitingForEqual = false;
  lastClickWasOperation = false;
  console.log(screen.textContent);

})

const clearAll = document.querySelector(".clear-all");
clearAll.addEventListener("click", () => {
  screen.textContent = "0";
  num1 = null, num2 = null;
  finishedTyping = false;
  waitingForEqual = false;
  lastClickWasOperation = false;
  operation = null;
})

const negativeSignal = document.querySelector(".negative-signal");
negativeSignal.addEventListener("click", () => {
  if(screen.textContent == "0")
    return;
  if(screen.textContent[0] == "-")
    screen.textContent = screen.textContent.slice(1, screen.textContent.length);
  else screen.textContent = "-" + screen.textContent;
})

const percentage = document.querySelector(".percentage");
percentage.addEventListener("click", () => {
  screen.textContent = String(Number(screen.textContent / 100));
})

const point = document.querySelector(".point");
point.addEventListener("click", () => {
  if(!screen.textContent.includes("."))
    screen.textContent = screen.textContent + ".";
})