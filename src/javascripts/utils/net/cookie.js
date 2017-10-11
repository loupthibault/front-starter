
function setCookie( c_name, value, exdays ) {
  let exdate = new Date();
  exdate.setDate( exdate.getDate() + exdays );
  let c_value = escape( value ) + ( ( exdays === null ) ? '' : '; expires=' + exdate.toUTCString() );
  document.cookie = c_name + '=' + c_value;
}

function clearAll() {

  let cookies = document.cookie.split( ';' );

  for ( let i = 0; i < cookies.length; i++ ) {
    let cookie = cookies[ i ];
    let eqPos = cookie.indexOf( '=' );
    let name = eqPos > -1 ? cookie.substr( 0, eqPos ) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

function getCookie( c_name ) {
  let c_value = document.cookie;
  let c_start = c_value.indexOf( ' ' + c_name + '=' );
  if ( c_start == -1 ) {
    c_start = c_value.indexOf( c_name + '=' );
  }
  if ( c_start == -1 ) {
    c_value = null;
  } else {
    c_start = c_value.indexOf( '=', c_start ) + 1;
    let c_end = c_value.indexOf( ';', c_start );
    if ( c_end == -1 ) {
      c_end = c_value.length;
    }
    c_value = unescape( c_value.substring( c_start, c_end ) );
  }
  return c_value;
}

export default {
  getCookie: getCookie,
  clearAll: clearAll,
  setCookie: setCookie
};