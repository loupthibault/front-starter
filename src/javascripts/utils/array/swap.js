export default (input, indexA, indexB) => {
  var temp = input[indexA];

  input[indexA] = input[indexB];
  input[indexB] = temp;
}