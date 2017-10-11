import ajax from './ajax';

export default (url) => {
  return ajax(url, 'arraybuffer');
};