const boxes = Array.from(document.querySelectorAll(".digit"));
const messageEl = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");

let attempts = 0;
 
boxes.forEach(function (box, index) {
  // Accept a single digit then jump to the next box
  box.addEventListener("input", function () {
    box.value = box.value.replace(/\D/g, "").slice(0, 1);

    if (box.value && index < boxes.length - 1) {
      boxes[index + 1].focus();
    }

    tryCheck();
  });

  // Backspace on an empty box moves back
  box.addEventListener("keydown", function (event) {
    if (event.key === "Backspace" && !box.value && index > 0) {
      boxes[index - 1].focus();
    }
  });
});

function tryCheck() {
  const entered = boxes.map(function (b) { return b.value; }).join("");

  if (entered.length === 3) {
    checkPassword(entered);
  } else {
    messageEl.textContent = "";
    messageEl.className = "";
  }
}

function checkPassword(entered) {
  attempts += 1;
  attemptsEl.textContent = "Attempts: " + attempts;

  if (entered === CORRECT_PASSWORD) {
    messageEl.textContent = "Login successful.";
    messageEl.className = "ok";
  } else {
    messageEl.textContent = "Incorrect password.";
    messageEl.className = "bad";
  }
}
