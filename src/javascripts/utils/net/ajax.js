export default (url, rtype='') => {

  return new Promise((resolve, reject) => {

    const method = 'GET';
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    rtype === 'arraybuffer' && xhr.setRequestHeader("Accept", 'application/octet-stream');
    xhr.responseType = rtype;
    
    xhr.onerror = () => { reject(new Error(`ajax() - error while loading '${url}'`)) };

    xhr.onload = () => {

      if (xhr.status >= 200 && xhr.status < 400) resolve(xhr.response);
      else xhr.onerror();
    };

    xhr.send();

  });
}