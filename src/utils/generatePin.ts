const generatePin = () =>
  (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

export { generatePin };
