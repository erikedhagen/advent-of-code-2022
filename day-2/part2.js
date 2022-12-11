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
};

const resultCodes = {
  X: "loss",
  Y: "draw",
  Z: "win",
};

const moveScores = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const resultScores = {
  loss: 0,
  draw: 3,
  win: 6,
};

const resultValues = {
  draw: 0,
  loss: -1,
  win: 1,
};

const moves = {
  rock: [0, 1, -1],
  paper: [-1, 0, 1],
  scissors: [1, -1, 0],
};

const getCounterMove = (move = "rock", goalResult = "win") => {
  const goalScore = resultValues[goalResult];
  const goalIndex = moves[move].indexOf(goalScore);

  const counterMove = Object.keys(moves)[goalIndex];
  return counterMove;
};

const getScore = (moves) => {
  // moves = Object.keys(moveCodes).reduce((moves, code) => {
  //   const move = moveCodes[code];
  //   return moves.replace(code, move);
  // }, moves);

  const move1 = moveCodes[moves.split(" ")[0]];
  const result = resultCodes[moves.split(" ")[1]];

  const counterMove = getCounterMove(move1, result);

  const score = moveScores[counterMove] + resultScores[result];

  // console.log("move:", move1, "result:", result);
  // console.log("counterMove", counterMove);

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
