
function clamp(min, value, max) {
  return value > max ? max : value < min ? min : value;
}

function valueFromRatio(min, max, ratio) { 
  return (max - min) * ratio + min;
}

function calculateRatio(min, max, value, bClamp=true) {
  var r = (value-min)/(max-min);
  return bClamp ? clamp(0, r, 1) : r;
}

function round(value, pow) {
  pow = Math.pow(10, pow);
  return parseInt(value * pow) / pow;
}

module.exports = {
  clamp: clamp,
  valueFromRatio: valueFromRatio,
  calculateRatio: calculateRatio,
  round: round
};
