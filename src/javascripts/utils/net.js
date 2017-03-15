

function loadImage(url) {
 
  return new Promise((resolve, reject) => {

    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Net.loadImage() - error while loading '${url}'`));
    img.src = url;
    img.crossOrigin = 'anonymous';

  });
}


function loadBytes(url) {

  return _ajax( url, 'arraybuffer' );
}


function loadJson(url) {

  return _ajax( url, '' )
    .then(() => JSON.parse(str));
}

function _ajax(url, rtype) {

  return new Promise((resolve, reject) => {

    const method = 'GET';
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.responseType = rtype;

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    rtype === 'arraybuffer' && xhr.setRequestHeader("Accept", 'application/octet-stream');
    
    xhr.onerror = () => { reject(new Error(`Net._ajax() - error while loading '${url}'`)) };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) resolve(xhr);
      else xhr.onerror();
    };

    xhr.send();

  });
}


module.exports = {
  loadJson  : loadJson,
  loadImage : loadImage,
  loadBytes : loadBytes
}