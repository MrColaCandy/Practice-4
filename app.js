var body = document.body;
var head = document.head;

var container = document.createElement("div");
container.className = "container";
var timer = document.createElement("div");
timer.className = "timer";

var btnGroup = document.createElement("div");
btnGroup.className = "btn-group";
var stop = document.createElement("button");
stop.className = "btn stop";
stop.innerText = "STOP";

var start = document.createElement("button");
start.className = "btn start";
start.innerText = "START";
var reset = document.createElement("button");
reset.className = "btn reset";
reset.innerText = "RESET";

btnGroup.append(start, stop, reset);
container.append(timer, btnGroup);
body.append(container);

function createSpan(className, innerText) {
  const span = document.createElement("span");
  span.className = className;
  span.innerText = innerText;
  return span;
}

const hours = createSpan("hours", "20");
const minutes = createSpan("minutes", "10");
const secondes = createSpan("secondes", "60");
const miliSecondes = createSpan("miliSecondes", "30");

timer.append(hours, minutes, secondes, miliSecondes);

head.innerHTML += "<link rel='stylesheet' href='style.css' />";
