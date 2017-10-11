import round from './round';

export default (value, pow) => {
  pow = Math.pow(10, pow);
  return round(value * pow) / pow;
};