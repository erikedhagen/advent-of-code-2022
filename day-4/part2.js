const fetchInput = async () => {
  // Fetch file from URL
  const url = "./input.txt";
  const response = await fetch(url);

  // Read response as text
  const text = await response.text();
  return text;
};

const isRangeInRange = (range1, range2) => {
  return range1[0] >= range2[0] && range1[1] <= range2[1];
};

const isNumberInRange = (number, range) => {
  console.log(`checking if ${number} is in ${range}`);
  return number >= range[0] && number <= range[1];
};

const hasRangeOverlap = (range1, range2) => {
  console.log(`checking if ${range1} overlaps ${range2}`);
  return (
    isNumberInRange(range1[0], range2) ||
    isNumberInRange(range1[1], range2) ||
    isNumberInRange(range2[0], range1) ||
    isNumberInRange(range2[1], range1)
  );
};

const checkRanges = (range1, range2) => {
  // console.log(
  //   `checking if ${range1[0]} is between ${range2[0]} and ${range2[1]}`,
  //   `or if ${range1[1]} is between ${range2[0]} and ${range2[1]}`
  // );

  /**
   * If first number in range1 is in range2 and
   * second number in range1 is in range2
   */
  // const result =
  //   isRangeInRange(range1, range2) || isRangeInRange(range2, range1);

  const result = hasRangeOverlap(range1, range2);
  console.log(`range has overlap? ${result}`);
  console.log(`---`);

  return result;
};

const getPriority = (itemType) => {
  return typePriorities[itemType];
};

const getScore = (pair) => {
  const range1 = pair
    .split(",")[0]
    .split("-")
    .map((item) => parseInt(item));
  const range2 = pair
    .split(",")[1]
    .split("-")
    .map((item) => parseInt(item));

  const score = checkRanges(range1, range2) ? 1 : 0;
  // const duplicateItem = findDuplicates(items1, items2)[0];
  // const score = getPriority(duplicateItem);

  return score;
};

const runTask = async () => {
  // Read input from file
  const text = await fetchInput();

  // Get each round
  const rounds = text.split("\n");

  console.log("Parsed " + rounds.length + " rows.");

  // Get scores for each round
  const scores = rounds.map((round) => {
    return getScore(round);
  });

  // Sum scores
  const sum = scores.reduce((acc, score) => acc + score, 0);

  return sum;
};

// Log text to console
runTask().then((result) => {
  console.log("result", result);
});
