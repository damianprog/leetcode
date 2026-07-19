/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  // const stack = [];

  // for (let i = 0; i < asteroids.length; i++) {
  //   if (asteroids[i] < 0) {
  //     let exploded = false;

  //     while (
  //       stack[stack.length - 1] &&
  //       stack[stack.length - 1] > 0 &&
  //       stack[stack.length - 1] <= Math.abs(asteroids[i])
  //     ) {
  //       if (stack.pop() === Math.abs(asteroids[i])) {
  //         exploded = true;
  //         break;
  //       }
  //     }
  //     if (!exploded) {
  //       if (stack.length === 0 || stack[stack.length - 1] < 0) {
  //         stack.push(asteroids[i]);
  //       }
  //     }
  //   } else {
  //     stack.push(asteroids[i]);
  //   }
  // }

  // return stack;

  // ========================================================================
  // Czytelniejsza wersjaa

  const stack = [];

  for (const asteroid of asteroids) {
    let alive = true;

    while (
      alive &&
      asteroid < 0 &&
      stack.length &&
      stack[stack.length - 1] > 0
    ) {
      const top = stack[stack.length - 1];

      if (top < -asteroid) {
        stack.pop();
      } else if (top === -asteroid) {
        stack.pop();
        alive = false;
      } else {
        alive = false;
      }
    }

    if (alive) {
      stack.push(asteroid);
    }
  }

  return stack;

  // ========================================================================
};
