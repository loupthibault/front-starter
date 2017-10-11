import Color from 'utils/color';

export default (value) => {

  const cssString = value.substring(1);

  const color1 = Color.CSS.fromHexString(cssString + 'FF');
  const color2 = Color.CSS.fromHexString(cssString + '00');

  return `linear-gradient(0deg, ${color1}, ${color2})`;
};