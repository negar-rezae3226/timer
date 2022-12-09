let startBox = document.querySelector(".start-box");
let startCounter = startBox.querySelector("#start-counter");
let inputCounter = startBox.querySelector("#input-counter");
let errorElement = document.querySelector("#error-message");
let timerCircle = document.querySelector(".c100");
let timerNum = document.querySelector(".c100 > span");
let loadingMessage = document.querySelector(".message .loading");
let successMessage = document.querySelector(".message .success");

startCounter.addEventListener("click", function () {
  let seconds = parseInt(inputCounter.value);

//#region if isNaN

  if (isNaN(seconds)) {
    errorElement.textContent = "زمان را به درستی وارد کنید";
    errorElement.classList.add("active");
    return;
  }

//#endregion

//#region else

  errorElement.classList.remove("active");
  startBox.classList.remove("active");
  timerCircle.style.display = "block";
  timerNum.textContent = seconds;
  loadingMessage.style.display = "block";
  successMessage.style.display = "none";

  //#region setinterval

  let originalSeconds = seconds;
  let lastPercent = "p100";
  let timerId = setInterval(() => {
    if (lastPercent) timerCircle.classList.remove(lastPercent);

    if (seconds <= 0) {
      clearInterval(timerId);
      startBox.classList.add("active");
      timerCircle.style.display = "none";
      loadingMessage.style.display = "none";
      successMessage.style.display = "block";
      inputCounter.value = "";
      return;
    }

    seconds -= 1;
    let percent = Math.abs(
      Math.floor(((originalSeconds - seconds) / originalSeconds) * 100 - 100)
    );
    lastPercent = `p${percent}`;
    timerCircle.classList.add(lastPercent);
    timerNum.textContent = seconds;
  }, 1000);
  //#endregion

//#endregion

});
