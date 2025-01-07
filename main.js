const possible = [
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, 1],
  [2, -1],
];

const BOARD_SIZE = 8;

function findShortestPath(start, goal) {
  const paths = [];

  const map = new Map();
  const queue = [];

  map.set(`${start[0]} ${start[1]}`, [start]);
  queue.push(`${start[0]} ${start[1]}`);

  while (queue.length > 0) {
    const currKey = queue.shift();
    const curr = currKey.split(" ").map((str) => parseInt(str));

    for (const move of possible) {
      const moved = [curr[0] + move[0], curr[1] + move[1]];
      if (
        moved[0] >= 0 &&
        moved[0] < BOARD_SIZE &&
        moved[1] >= 0 &&
        moved[1] < BOARD_SIZE
      ) {
        if (moved[0] == goal[0] && moved[1] == goal[1]) {
          const copy = map.get(currKey).map((x) => x);
          copy.push(moved);

          paths.push(copy);
        } else if (!map.has(`${moved[0]} ${moved[1]}`)) {
          const copy = map.get(currKey).map((x) => x);
          copy.push(moved);

          map.set(`${moved[0]} ${moved[1]}`, copy);
          queue.push(`${moved[0]} ${moved[1]}`);
        }
      }
    }
  }

  let res = null;
  for (const path of paths) {
    if (!res || path.length < res.length) {
      res = path;
    }
  }

  console.log(`You made it in ${res.length} moves! Here's your path:`);
  res.forEach((move) => console.log(move));
}

findShortestPath([0, 0], [7, 7]);
