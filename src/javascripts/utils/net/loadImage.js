export default (url) => {

  return new Promise((resolve, reject) => {

    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Net.loadImage() - error while loading '${url}'`));
    img.src = url;
    img.crossOrigin = 'anonymous';
  });
}