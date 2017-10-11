export default (min, value, max) => {
  return value > max ? max : value < min ? min : value;
};