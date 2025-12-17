// Select all player choice buttons (rock, paper, scissors)
const choices = document.querySelectorAll(".choice");

// Score counters
let userScore = 0;
let compScore = 0;

// Mapping choices to emoji icons
const icons = {
  rock: "👊🏻",
  paper: "🖐🏻",
  scissors: "✌🏻"
};

// Result display elements
const result = document.querySelector(".result");
const resultstatus = document.querySelector(".resultstatus");
const msg = document.querySelector(".msg");


// Generate a random choice for the computer
const genCompChoice = () => {
  const names = ["rock", "paper", "scissors"];
  return names[Math.floor(Math.random() * names.length)];
}

// Display winner message and update score
const showWinner = (userWin, user, comp) => {
  if (userWin) {
    userScore++;
    resultstatus.innerText = "You Won!";
    result.innerText = `Your ${user} beats Computer's ${comp}`;
    msg.style.backgroundColor = "lightgreen";
  } else {
    compScore++;
    resultstatus.innerText = "You Lost!";
    result.innerText = `Computer's ${comp} beats Your ${user}`;
    msg.style.backgroundColor = "red";
  }
  printScore(); // Refresh score UI
}

// Update score values on the screen
const printScore = () => {
  document.querySelector("#userscore").innerText = `${userScore}`;
  document.querySelector("#compscore").innerText = `${compScore}`;
}

// Utility function to create delay for animations
function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Countdown animation before revealing choices
async function countdown() {
  document.querySelector(".countdown").innerText = "Rock";
  document.querySelectorAll(".display").forEach(d => d.innerText = icons.rock);
  await wait(500);

  document.querySelector(".countdown").innerText = "Paper";
  document.querySelectorAll(".display").forEach(d => d.innerText = icons.paper);
  await wait(500);

  document.querySelector(".countdown").innerText = "Scissors";
  document.querySelectorAll(".display").forEach(d => d.innerText = icons.scissors);
  await wait(500);

  document.querySelector(".countdown").innerText = "Shoot!";
  await wait(150); // Small delay so "Shoot!" is visible
}

// Main game logic
const playGame = async () => {

  // Ask player name and update UI
  let name = prompt("Enter Your Name");
  document.querySelector("#username").innerText = name;
  document.querySelector(".modal-body").innerHTML = `<strong>${name} vs Computer</strong><br>Match Started `;

  let gameModal;

  // Show game start modal on page load
  window.onload = function () {
    gameModal = new bootstrap.Modal(
      document.getElementById("gameModal")
    );
    gameModal.show();
  }

  // Attach click events to each choice button
  choices.forEach(choice => {

    choice.addEventListener("click", async () => {

      // Disable buttons to prevent multiple clicks
      choices.forEach(btn => btn.disabled = true);

      // Reset message box background
      msg.style.backgroundColor = "transparent";

      // Clear previous result text
      resultstatus.innerText = "";
      result.innerText = "";

      // Play countdown animation
      await countdown();

      // Get user and computer choices
      const userChoice = choice.getAttribute("id");
      const compChoice = genCompChoice();

      // Display selected icons
      document.querySelector("#userchoice").innerText = icons[userChoice];
      document.querySelector("#compchoice").innerText = icons[compChoice];

      // Check for draw condition
      if (userChoice === compChoice) {
        result.innerText = "It's a draw!";
        msg.style.backgroundColor = "gray";
        printScore(); // Scores unchanged, UI refreshed
      } else {

        // Determine winner based on rules
        let userWin = true;
        if (userChoice === "rock")
          userWin = compChoice === "paper" ? false : true;
        else if (userChoice === "paper")
          userWin = compChoice === "scissors" ? false : true;
        else
          userWin = compChoice === "rock" ? false : true;

        showWinner(userWin, userChoice, compChoice);
      }

      // Re-enable buttons for next round
      choices.forEach(btn => btn.disabled = false);

    }); // click handler
  }); // forEach
}; // playGame

// Start the game
playGame();