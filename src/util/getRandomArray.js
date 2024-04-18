function getRandomArray(length, min, max) {
  console.log(length)
  const randomArray = [];
  while (randomArray.length < length) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomArray.includes(randomNumber)) {
      randomArray.push(randomNumber);
    }
  }
  return randomArray;
}

// const randomNumbers = getRandomArray(8, 1, 100);
// console.log(randomNumbers);
export default getRandomArray
