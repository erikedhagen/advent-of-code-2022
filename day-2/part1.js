const fetchInput = async () => {
  // Fetch file from URL
  const url = "./input.txt";
  const response = await fetch(url);

  // Read response as text
  const text = await response.text();
  return text;
};

const moveCodes = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const scores = {
  rock: 1,
  paper: 2,
  scissors: 3,
  draw: 3,
  loss: 0,
  win: 6,
};

const getScore = (moves) => {
  moves = Object.keys(moveCodes).reduce((moves, code) => {
    const move = moveCodes[code];
    return moves.replace(code, move);
  }, moves);

  const outcomes = {
    "rock rock": ["draw", 1],
    "rock paper": ["win", 2],
    "rock scissors": ["loss", 3],
    "paper rock": ["loss", 1],
    "paper paper": ["draw", 2],
    "paper scissors": ["win", 3],
    "scissors rock": ["win", 1],
    "scissors paper": ["loss", 2],
    "scissors scissors": ["draw", 3],
  };
  const outcome = outcomes[moves];

  const score = scores[outcome[0]] + outcome[1];

  return score;
};

const runTask = async () => {
  // Read input from file
  const text = await fetchInput();

  // Get each round
  const rounds = text.split("\n");

  // Get scores for each round
  const scores = rounds.map((round) => getScore(round));

  // Sum scores
  const sum = scores.reduce((acc, score) => acc + score, 0);

  return sum;
};

// Log text to console
runTask().then((result) => {
  console.log("result", result);
});
