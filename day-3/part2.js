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

const getPriority = (itemType) => {
  return typePriorities[itemType];
};

const findTriplets = (items) => {
  const triplets = [];
  items.forEach((item, index) => {
    const matches = items.join("").match(new RegExp(item, "g"));
    if (matches.length >= 3) {
      console.log("masdasd", matches, item, items.join(""));
      triplets.push(item);
    }
  });

  return triplets;
};

const findCommonItem = (sacks) => {
  const commonItems = sacks[0]
    .filter((item) => sacks[1].includes(item))
    .filter((item) => sacks[2].includes(item));

  return commonItems[0];
};

const getScore = (groupSacks) => {
  const groupedItems = groupSacks.map((sack) => {
    return sack.split("");
  }, []);

  const badge = findCommonItem(groupedItems);
  const score = getPriority(badge);
  // console.log("badge", badge, score);

  return score;
};

const runTask = async () => {
  // Read input from file
  const text = await fetchInput();

  // Get each round
  const rucksacks = text.split("\n");

  // Split into groups of 3
  const groups = [];
  for (i = 0; i < rucksacks.length; i += 3) {
    const group = rucksacks.slice(i, i + 3);
    groups.push(group);
  }

  // Get scores for each group
  const scores = groups.map((group) => {
    return getScore(group);
  });

  // Sum scores
  const sum = scores.reduce((acc, score) => acc + score, 0);

  return sum;
};

// Log text to console
runTask().then((result) => {
  console.log("result", result);
});
