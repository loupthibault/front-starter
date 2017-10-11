export default (min, max, ratio) => {
  return (max - min) * ratio + min;
};