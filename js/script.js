window.addEventListener("load", function () {
  let initialTime = 0;
  let remainingTime = 0;
  let initialPercentage = "0.00%";
  let timerInterval;
  let isGameRunning = false;

  function updateTimer() {
    const difficultyTimer = document.getElementById("difficulty-timer");
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    difficultyTimer.innerHTML = `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  }

  updateTimer();

  const gameDifficultySelect = document.getElementById("game-difficulty");
  gameDifficultySelect.addEventListener("change", function () {
    const selectedOption = gameDifficultySelect.value;
    switch (selectedOption) {
      case "beginner":
        initialTime = 105;
        break;
      case "normal":
        initialTime = 75;
        break;
      case "hard":
        initialTime = 30;
        break;
      default:
        initialTime = 0;
        break;
    }
    remainingTime = initialTime;
    updateTimer();
  });

  document.getElementById("btn-start").addEventListener("click", function () {
    if (!isGameRunning) {
      startGame();
    }
  });

  document.getElementById("btn-pause").addEventListener("click", function () {
    if (isGameRunning) {
      pauseGame();
    }
  });

  document.getElementById("btn-stop").addEventListener("click", resetGame);

  let randomNumberTimer;
  document.getElementById("random-number").innerHTML = "-";

  function updateRandomNumberDelay(difficulty) {
    switch (difficulty) {
      case "beginner":
        randomNumberDelay = 1000; // 1 segundo
        break;
      case "normal":
        randomNumberDelay = 500; // 0.5 segundos
        break;
      case "hard":
        randomNumberDelay = 300; // 0.3 segundos
        break;
      default:
        randomNumberDelay = 1000; // Padrão para iniciantes
        break;
    }
  }

  function startGame() {
    const selectedDifficulty = gameDifficultySelect.value;
    if (selectedDifficulty === "selection") {
      alert("É necessário selecionar uma dificuldade para iniciar o jogo.");
      return;
    }
    btnControl(true, false);
    isGameRunning = true;

    timerInterval = setInterval(function () {
      remainingTime--;
      if (remainingTime <= 0) {
        stopGame();
      }
      updateTimer();
    }, 1000);

    randomNumberTimer = setInterval(randomNumber, 1000);

    updateRandomNumberDelay(selectedDifficulty);
  clearInterval(randomNumberTimer);
  randomNumberTimer = setInterval(randomNumber, randomNumberDelay);
  }

  
  function pauseGame() {
    btnControl(false, true);
    isGameRunning = false;
    clearInterval(randomNumberTimer);
    clearInterval(timerInterval);
  }

  function stopGame() {
    btnControl(false, true);
    isGameRunning = false;
    clearInterval(timerInterval);
    clearInterval(randomNumberTimer);
    remainingTime = 0;
    updateTimer();
  }

  function resetGame() {
    gameDifficultySelect.value = "selection";
    document.getElementById("even-numbers").innerHTML = "0";
    evenCount = 0;
    successCount = 0;
    mistakesCount = 0;
    successSpan.innerHTML = "0";
    mistakesSpan.innerHTML = "0";
    document.getElementById("success-percentage").innerHTML = "0.00%";
    document.getElementById("random-number").innerHTML = "-";
    stopGame();
  }

  document.getElementById("even-numbers").innerHTML = "0";
  let evenCount = 0;

  function randomNumber() {
    document.getElementById("random-number").innerHTML =
      parseInt(Math.random() * 100) + 1;
    if (document.getElementById("random-number").innerHTML % 2 == 0) {
      evenCount++;
    }
    document.getElementById("even-numbers").innerHTML = evenCount;
    document.getElementById("random-number").style.color = "black";
    updatePercentage();
  }

  function btnControl(play, pause) {
    document.getElementById("btn-start").disabled = play;
    document.getElementById("btn-pause").disabled = pause;
  }

  btnControl(false, true);

  let successCount = 0;
  let mistakesCount = 0;

  const successSpan = document.getElementById("success");
  const mistakesSpan = document.getElementById("mistakes");

  successSpan.innerHTML = "0";
  mistakesSpan.innerHTML = "0";

  const randomNumberContainer = document.getElementById("random-number");

  randomNumberContainer.addEventListener("click", function () {
    let randomNumber = randomNumberContainer.innerHTML;
    if (randomNumber !== "-") { // Verifica se o conteúdo não é igual a "-"
      if (randomNumber % 2 === 0) {
        successCount++;
        successSpan.innerHTML = successCount;
        randomNumberContainer.style.color = "green";
      } else {
        mistakesCount++;
        mistakesSpan.innerHTML = mistakesCount;
        randomNumberContainer.style.color = "red";
      }
    }
  });
  

  document.getElementById("success-percentage").innerHTML = initialPercentage;

  function updatePercentage() {
    const successCounter = parseInt(document.getElementById("success").innerHTML);
    const evenCounter = parseInt(document.getElementById("even-numbers").innerHTML);

    if(!isNaN(successCounter) && !isNaN(evenCounter) && evenCounter !== 0) {
      initialPercentage = (successCounter / evenCounter) * 100;
    }

    document.getElementById("success-percentage").innerHTML = initialPercentage.toFixed(2) + "%";
  }
});
