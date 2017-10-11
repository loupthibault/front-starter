export default (value) => {
  return value < 0 ? parseInt(value - .5) : parseInt(value + .5);
}