import clamp from './clamp';

export default ( min, max, value, bClamp=true ) => {
  const r = ( value - min ) / ( max - min );
  return bClamp ? clamp( 0, r, 1 ) : r;
};