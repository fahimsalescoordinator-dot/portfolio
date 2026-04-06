const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

const OPPOSITES = {
  up: "down",
  down: "up",
  left: "right",
  right: "left"
};

export { DIRECTIONS };

export function createInitialState(config, random = Math.random) {
  const { columns, rows } = config;
  const centerX = Math.floor(columns / 2);
  const centerY = Math.floor(rows / 2);
  const snake = [
    { x: centerX, y: centerY },
    { x: centerX - 1, y: centerY },
    { x: centerX - 2, y: centerY }
  ];

  return {
    columns,
    rows,
    snake,
    direction: "right",
    food: placeFood(snake, columns, rows, random),
    score: 0,
    status: "running"
  };
}

export function isOppositeDirection(currentDirection, nextDirection) {
  return OPPOSITES[currentDirection] === nextDirection;
}

export function resolveDirection(currentDirection, requestedDirection) {
  if (!requestedDirection || !DIRECTIONS[requestedDirection]) {
    return currentDirection;
  }

  if (isOppositeDirection(currentDirection, requestedDirection)) {
    return currentDirection;
  }

  return requestedDirection;
}

export function placeFood(snake, columns, rows, random = Math.random) {
  const openCells = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const occupied = snake.some(segment => segment.x === x && segment.y === y);
      if (!occupied) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) {
    return null;
  }

  const index = Math.floor(random() * openCells.length);
  return openCells[index];
}

export function advanceState(state, requestedDirection, random = Math.random) {
  if (state.status !== "running") {
    return state;
  }

  const direction = resolveDirection(state.direction, requestedDirection);
  const vector = DIRECTIONS[direction];
  const nextHead = {
    x: state.snake[0].x + vector.x,
    y: state.snake[0].y + vector.y
  };

  const hitWall =
    nextHead.x < 0 ||
    nextHead.x >= state.columns ||
    nextHead.y < 0 ||
    nextHead.y >= state.rows;

  if (hitWall) {
    return {
      ...state,
      direction,
      status: "game-over"
    };
  }

  const eatsFood = Boolean(state.food) && nextHead.x === state.food.x && nextHead.y === state.food.y;
  const collisionBody = eatsFood ? state.snake : state.snake.slice(0, -1);
  const hitSelf = collisionBody.some(segment => segment.x === nextHead.x && segment.y === nextHead.y);

  if (hitSelf) {
    return {
      ...state,
      direction,
      status: "game-over"
    };
  }

  const nextSnake = [nextHead, ...state.snake];
  if (!eatsFood) {
    nextSnake.pop();
  }

  const nextFood = eatsFood ? placeFood(nextSnake, state.columns, state.rows, random) : state.food;
  const status = nextFood ? "running" : "won";

  return {
    ...state,
    snake: nextSnake,
    direction,
    food: nextFood,
    score: eatsFood ? state.score + 1 : state.score,
    status
  };
}
