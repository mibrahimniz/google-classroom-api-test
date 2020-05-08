
function init(canvas) {
  smoothie = new SmoothieChart({maxValue:1250,minValue:800,timestampFormatter:SmoothieChart.timeFormatter,responsive: true});
  smoothie.streamTo(canvas,5000);
// Data
  line1 = new TimeSeries();
  // var line2 = new TimeSeries();
  console.log(line1);
//
// Add a random value to each line every second
//   setInterval(function() {
//     var i=0;
//       console.log(data[i]);
//       line1.append(new Date().getTime(), data[i]);
//       i += 1;
//     else {
//       line1.append(new Date().getTime(), 0);
//
//     }
//   }, 1000/360);

// Add to SmoothieChart
  smoothie.addTimeSeries(line1,{ strokeStyle: 'rgba(0, 255, 0, 1)', lineWidth: 1 });
  // smoothie.addTimeSeries(line2);
}
function arrayMax(array) {
  return array.reduce(function(a, b) {
    return Math.max(a, b);
  });
}

function arrayMin(array) {
  return array.reduce(function(a, b) {
    return Math.min(a, b);
  });
}

function updateSeries(d) {
  console.log("Updating Series");
  line1.append(new Date().getTime(), d);
}


