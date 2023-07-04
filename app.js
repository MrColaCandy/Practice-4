var timeStamps = [];

var lastUpdate = Date.now();
var mili = 0;
var hundredth = 0;
var second = 0;
var minute = 0;
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

var timerBox = createElement("div", "timer-box");
var buttonBox = createElement("div", "button-box");

var { circle: miliDiv, span: miliSpan } = createTimeCircle("mili");
var { circle: hundredthDiv, span: hundredthSpan } =
  createTimeCircle("hundredth");
var { circle: secondDiv, span: secondSpan } = createTimeCircle("second");
var { circle: minuteDiv, span: minuteSpan } = createTimeCircle("minute");
var loop = setInterval(() => {
  var now = Date.now();
  var dt = now - lastUpdate;
  lastUpdate = now;
  mili += dt;
  if (mili >= 100) {
    hundredth += 10;
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

  miliSpan.innerText = mili;
  hundredthSpan.innerText = hundredth;
  secondSpan.innerText = second;
  minuteSpan.innerText = minute;

  calRadialProgress(miliDiv, mili);
  calRadialProgress(hundredthDiv, hundredth);
  calRadialProgress(secondDiv, Math.round((second / 60) * 100));
  calRadialProgress(minuteDiv, Math.round((minute / 60) * 100));
}, 0);
timerBox.append(minuteDiv, secondDiv, hundredthDiv, miliDiv);

document.body.append(timerBox);
function createTimeCircle(id) {
  var circle = createElement("div", "circle", id);
  var span = createElement("span");
  circle.append(span);
  return { circle, span };
}
