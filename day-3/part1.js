const fetchInput = async () => {
  // Fetch file from URL
  const url = "./input.txt";
  const response = await fetch(url);

  // Read response as text
  const text = await response.text();
  return text;
};

const typePriorities = {};
for (i = 65; i <= 90; i++) {
  typePriorities[String.fromCharCode(i)] = i - 65 + 27;
  typePriorities[String.fromCharCode(i).toLowerCase()] = i - 65 + 1;
}

const findDuplicates = (items1, items2) => {
  const duplicates = items1.filter((item) => items2.includes(item));

  return duplicates;
};

const getPriority = (itemType) => {
  return typePriorities[itemType];
};

const getScore = (sack) => {
  const items1 = sack.substring(0, sack.length / 2).split("");
  const items2 = sack.substring(sack.length / 2, sack.length).split("");

  const duplicateItem = findDuplicates(items1, items2)[0];
  const score = getPriority(duplicateItem);

  return score;
};

const runTask = async () => {
  // Read input from file
  const text = await fetchInput();

  // Get each round
  const rucksacks = text.split("\n");

  // Get scores for each round
  const scores = rucksacks.map((sack) => {
    return getScore(sack);
  });

  // Sum scores
  const sum = scores.reduce((acc, score) => acc + score, 0);

  return sum;
};

// Log text to console
runTask().then((result) => {
  console.log("result", result);
});
