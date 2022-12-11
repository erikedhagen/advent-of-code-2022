const fetchInput = async () => {
  // Fetch file from URL
  const url = "./input.txt";
  const response = await fetch(url);

  // Read response as text
  const text = await response.text();
  return text;
};

class Crane {
  limit = 99999;
  behavior = "moveMultiple";

  constructor(stackData, moveData) {
    this.originalStacks = [];
    this.stacks = [];
    this.moves = [];
    this.parseStackData(stackData);
    this.parseMoveData(moveData);

    console.log(this.stacks);
    this.start();
    console.log(this.stacks);

    // console.log(this.moves);
  }

  start() {
    console.log("executing", Math.min(this.moves.length, this.limit), "moves");
    this.moves.slice(0, this.limit).forEach((move) => {
      if (this.behavior == "moveMultiple") {
        this.moveMultiple(move);
      } else {
        this.move(move);
      }
    });
  }

  move(move) {
    // console.log("move", move.size, "from", move.from, "to", move.to);
    for (let i = 0; i < move.size; i++) {
      const item = this.stacks[move.from - 1].pop();
      this.stacks[move.to - 1].push(item);
    }
  }

  moveMultiple(move) {
    // console.log("move", move.size, "from", move.from, "to", move.to);
    const items = this.stacks[move.from - 1].splice(-move.size, move.size);
    this.stacks[move.to - 1].push(...items);
  }

  parseStackData(data) {
    // Get lines and remove last line (index numbers)
    const lines = data.split("\n").slice(0, -1);

    // Prepare empty stacks
    const stacksCount = Math.ceil(lines[0].length / 4);
    for (let i = 0; i < stacksCount; i++) {
      this.stacks.push([]);
    }

    // Parse each line and add to stacks
    lines.forEach((line) => {
      this.parseStackLine(line);
    });
  }

  parseStackLine(line) {
    let stackIndex = 0;

    for (let i = 0; i < line.length; i += 4) {
      const str = line.substr(i, 3).replace(/\s/g, "");
      if (str.length) {
        const val = str.substr(1, 1);
        this.stacks[stackIndex].unshift(val);
      }
      stackIndex++;
    }
  }

  parseMoveData(moveData) {
    this.moves = moveData.map((line) => {
      const matches = line.match(/move (\d+) from (\d+) to (\d+)/);
      return {
        size: parseInt(matches[1]),
        from: parseInt(matches[2]),
        to: parseInt(matches[3]),
      };
    });
  }

  getResult() {
    const result = this.stacks.reduce((acc, stack) => {
      return acc + stack[stack.length - 1];
    }, "");
    return result;
  }
}

const runTask = async () => {
  // Read input from file
  const input = await fetchInput();

  // Get pattern
  const pattern = input.split("\n\n")[0];

  // Get each round
  const rounds = input.split("\n\n")[1].split("\n");

  const crane = new Crane(pattern, rounds);

  return crane.getResult();
};

// Log text to console
runTask().then((result) => {
  console.log("result", result);
});
