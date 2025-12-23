let isTimerSet = false;
let isTimerRunning = false;
let countdownTime, timerID, totalCountDownTime, currentTargetBtn;

const presetTimeBtns = document.querySelectorAll(".preset-btn");
const timeDisplaySec = document.querySelector(".timer-display");
const startStopBtn = document.querySelector(".start-stop-btn");
const playPauseLogo = document.querySelector(".play-pause-btn");
const progressBar = document.querySelector(".progress-bar");

function setTimer(e) {
  currentTargetBtn = e.currentTarget;
  if (!currentTargetBtn.classList.value.includes("active")) {
    //before adding the active class to any, remove the active class from any all time preset btns
    presetTimeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    resetTimer(); //resetting the timer, for a new pomodoro
    //then we add the active class to clicked time preset btn -  solved edge case
    currentTargetBtn.classList.add("active");
    countdownTime = currentTargetBtn.dataset.minutes * 60;
    totalCountDownTime = countdownTime;
    isTimerSet = true;
    timeDisplay(countdownTime);
  } else {
    currentTargetBtn.classList.remove("active");
    resetTimer();
  }
}

function timeDisplay(secs) {
  let minutesLeft = Math.floor(secs / 60);
  let secondsLeft = secs % 60;
  let formattedForm = `${minutesLeft.toString().padStart(2, "0")}:${secondsLeft
    .toString()
    .padStart(2, "0")}`;
  timeDisplaySec.innerHTML = formattedForm;
  handleProgressUI();
}

function handlePlayPauseUI() {
  if (isTimerRunning) {
    startStopBtn.innerHTML = "Stop"; //playing
    playPauseLogo.classList.add("active");
    playPauseLogo.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    startStopBtn.innerHTML = "Start"; //paused
    playPauseLogo.classList.remove("active");
    playPauseLogo.innerHTML = `<i class="fa-solid fa-play" ></i>`;
  }
}

function resetTimer() {
  isTimerSet = false;
  isTimerRunning = false;
  countdownTime = 0;
  clearInterval(timerID); //stop the timer
  timeDisplay(0);
  handlePlayPauseUI();
}

function handleTimerPlayPause(e) {
  if (!isTimerSet) return; //if time not set, timer doesn't start
  if (e.currentTarget.innerHTML == "Start") {
    //starting
    isTimerRunning = true;
    handlePlayPauseUI();
    timerID = setInterval(function () {
      //starting the timer
      countdownTime--;
      if (countdownTime == 0) {
        //if countdown hits 0, we reset timer
        currentTargetBtn.classList.remove("active");
        resetTimer();
      }
      timeDisplay(countdownTime);
    }, 1000);
  } else if (e.currentTarget.innerHTML == "Stop") {
    // stopping
    isTimerRunning = false;
    handlePlayPauseUI();
    clearInterval(timerID); //stop the timer
  }
}

function handleProgressUI() {
  let percent = (totalCountDownTime - countdownTime) / totalCountDownTime;
  progressBar.style.width = `${(percent * 100).toFixed(2)}%`;
}

presetTimeBtns.forEach((btn) => {
  btn.addEventListener("click", setTimer);
});
startStopBtn.addEventListener("click", handleTimerPlayPause);
