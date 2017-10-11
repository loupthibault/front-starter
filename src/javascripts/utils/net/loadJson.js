import ajax from './ajax';

export default (url) => {
  return ajax( url, '' )
    .then( ( str ) => JSON.parse( str ) );
};