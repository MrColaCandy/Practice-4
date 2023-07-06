var timeStamps = [];
var lastUpdate = Date.now();
var mili = 0;
var hundredth = 0;
var second = 0;
var minute = 0;

var start = true;

function createElement(element = "div", className = "", id = "") {
  var div = document.createElement(element);
  div.id = id;
  div.className = className;
  return div;
}

function calRadialProgress(element, progress = 0) {
  element.style.background = `radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(rgb(206, 26, 22) ${progress}%, pink 0)`;
}

var timerBox = createElement("div", "box");
var buttonBox = createElement("div", "box");
var timeBox = createElement("div", "time-box");

var { circle: miliDiv, span: miliSpan } = createTimeCircle("mili");
var { circle: hundredthDiv, span: hundredthSpan } =
  createTimeCircle("hundredth");
var { circle: secondDiv, span: secondSpan } = createTimeCircle("second");
var { circle: minuteDiv, span: minuteSpan } = createTimeCircle("minute");
setInterval(() => {
  if (start) {
    updateTimer();
  }
}, 0);

var stopButton = createElement("button", "btn", "stop");
stopButton.innerText = "STOP";
stopButton.onclick = () => {
  if (!start) return;
  start = false;
  timeStamps.push({
    minute,
    second,
    hundredth,
    mili,
  });
  renderStamps();
};

var resetButton = createElement("button", "btn", "reset");
resetButton.innerText = "RESET";
resetButton.onclick = () => {
  start = false;
  reset();
};
var startButton = createElement("button", "btn", "start");
startButton.innerText = "START";
startButton.onclick = () => {
  if (start) return;
  start = true;
  var lastTime = timeStamps[timeStamps.length - 1];
  mili = lastTime.mili;
  hundredth = lastTime.hundredth;
  second = lastTime.second;
  minute = lastTime.minute;
  renderTimer(mili, hundredth, second, minute);
};

timerBox.append(minuteDiv, secondDiv, hundredthDiv, miliDiv);
buttonBox.append(stopButton, startButton, resetButton);
document.body.append(timerBox, buttonBox, timeBox);
function reset() {
  mili = hundredth = second = minute = 0;
  renderTimer(0, 0, 0, 0);
}

function updateTimer() {
  var now = Date.now();
  var dt = now - lastUpdate;
  lastUpdate = now;
  mili += dt;
  if (mili >= 10) {
    hundredth++;
    mili = 0;
  }

  if (hundredth >= 100) {
    hundredth = 0;

    second++;
  }

  if (second >= 60) {
    second = 0;
    minute++;
  }
  if (minute >= 60) {
    minute = 0;
  }

  renderTimer(mili * 10, +hundredth, +second, +minute);
}

function renderTimer(mili, hundredth, second, minute) {
  miliSpan.innerText = toText(mili);
  hundredthSpan.innerText = toText(hundredth);
  secondSpan.innerText = toText(second);
  minuteSpan.innerText = toText(minute);

  calRadialProgress(miliDiv, mili);
  calRadialProgress(hundredthDiv, hundredth);
  calRadialProgress(secondDiv, Math.round((second / 60) * 100));
  calRadialProgress(minuteDiv, Math.round((minute / 60) * 100));
}

function toText(number) {
  return number < 10 ? `0${number}` : number;
}

function createTimeCircle(id) {
  var circle = createElement("div", "circle", id);
  var span = createElement("span");
  circle.append(span);
  return { circle, span };
}
function renderStamps() {
  var times = [...timeBox.children];
  times.forEach((t) => t.remove());
  timeStamps.forEach((t) => {
    var stamp = createElement("div", "stamp", `${t.id}`);
    stamp.innerText = `${toText(t.minute)} : ${toText(t.second)} : ${toText(
      t.hundredth
    )} : ${toText(Math.floor(mili * 10))}`;
    timeBox.append(stamp);
  });
}
