// ASSIGNMENT COMPLETED

let img;
let imgPath = "Wave_Hokusai.jpg";
let cellSize = 6;
let word = "WAVE";

async function setup() {
  createCanvas(800, 400);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont("Georgia");

  img = await loadImage(imgPath);
  img.resize(800, 400);
  //noLoop();
}

function draw() {
  background(0);
  fill(135, 206, 235);

  let count = 0; 

  for (let x = 0; x < img.width; x += cellSize) {
    for (let y = 0; y < img.height; y += cellSize) {
      let brightVal = brightness(img.get(x, y));

		// Bright = big letter, Dark = small letter
      let baseSize = map(brightVal, 0, 100, 2, cellSize * 1.5);

      // Distance between mouse and current letter
      let d = dist(mouseX, mouseY, x, y);

      // Effect strongest near mouse, gradually disappears
      let mouseEffect = map(d, 0, 150, 1, 0);
      mouseEffect = constrain(mouseEffect, 0, 1);

      // Gentle wave default
      let wave = sin(x * 0.03 + y * 0.02 + frameCount * 0.04) * 2;

      // Stronger wave mouse
      let extraWave = sin(x * 0.04 + y * 0.03 + frameCount * 0.08) * 12 * mouseEffect;

      // Combine wave
      let moveY = wave + extraWave;

      // Increase size near mouse
      let size = baseSize + mouseEffect * 4;

      textSize(size);

      // Modulo cycle through letters
      let letter = word[count % word.length];

      // Letter with wave movement (middle of it's cell)
      text(letter, x + cellSize / 2, y + cellSize / 2 + moveY);

      count++;
    }
  }
}
