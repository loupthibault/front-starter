

function from(opt) { return Array.prototype.slice.call(opt, 0); }

function combine(...arrays) { return [].concat(...arrays); }

function min(arr) { return Math.min(...arr); }

function max(arr) { return Math.max(...arr); }

function shuffle(array) {

  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function swap(input, indexA, indexB) {
  var temp = input[indexA];

  input[indexA] = input[indexB];
  input[indexB] = temp;
}


module.exports = {
  combine: combine,
  from: from,
  max: max,
  min: min,
  shuffle: shuffle,
  swap: swap
};
