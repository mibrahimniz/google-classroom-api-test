timers={};

window.onload=function () {
  // alert("loaded");
  // initTimer();
};

function initTimer(name,event,elementId) {
  if (timers[name]==null) {

    timers[name] = new Timer();
    // upTimer.start();
    // upTimer.pause();
    timers[name].addEventListener(event, function (e) {
      $(elementId).text(timers[name].getTimeValues().toString());
      // alert(upTimer.getTimeValues().toString());
    });
  }
}

function startTimer(name) {
  timers[name].start();
}
function stopTimer(name) {
  timers[name].stop();
}




