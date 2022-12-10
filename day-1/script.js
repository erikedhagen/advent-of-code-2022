const fetchInput = async () => {
  // Fetch file from URL
  const url = "./data/input.txt";
  const response = await fetch(url);

  // Read response as text
  const text = await response.text();
  return text;
};

const runTask = async () => {
  // Read input from file
  const text = await fetchInput();

  // Get each elf's stash (split input into lines)
  const stashes = text.split("\n\n");

  // Sum each elf's stash of calories
  const sums = stashes.map((stash) => {
    // Sum each calory value
    const values = stash.split("\n");
    const sum = values.reduce((acc, value) => acc + parseInt(value), 0);
    return sum;
  });

  // Sort values in descending order
  sums.sort((a, b) => b - a);

  // Get the top 3 values
  const topThreeSum = sums.slice(0, 3).reduce((acc, value) => acc + value, 0);
  console.log(topThreeSum);

  return topThreeSum;
};

// Log text to console
runTask().then((result) => {
  console.log("result", result);
});
