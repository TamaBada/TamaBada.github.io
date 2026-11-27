// ASSIGNMENT COMPLETED

let table;
let cities = [];
let maxDays = 0;
let hoveredRow = -1;

async function setup() {
 createCanvas(1000, 600);
	noStroke();

  table = await loadTable("Yellow_Dust.csv",",","header");

// All Citys and maximum Days
  for (let i = 0; i < table.getRowCount(); i++) {

    let city = table.getString(i, "City");
    let days = table.getNum(i, "Yellow-Dust Days");

    if (!cities.includes(city)) {
      cities.push(city);
    }

    if (days > maxDays) {
      maxDays = days;
    }
  }
}


// Visualisation
function draw() {
  background("#FAF9F6");
  hoveredRow = -1;

  // Header
  fill("#282522");
  noStroke();

  textAlign(CENTER);
  textSize(28);
  text("YELLOW DUST DAYS", width / 2, 65);

  textSize(13);
  text("South Korea · 2020–2025", width / 2, 95);


  // Years
  textSize(13);

  for (let year = 2020; year <= 2025; year++) {

    let x = map(year, 2020, 2025, 260, 850);

    text(year, x, 175);

  }


  // Citys
  textAlign(RIGHT);
  textSize(14);

  for (let i = 0; i < cities.length; i++) {

    let y = 210 + i * 80;

    text(cities[i], 205, y + 5);

  }

 // Connect Dots

 for (let i = 0; i < cities.length; i++) {

  let y = 210 + i * 80;

  stroke("#D0D0D0");
  strokeWeight(1);

  line(260, y, 850, y);

}

  // Draw Dots
  for (let i = 0; i < table.getRowCount(); i++) {

    let city = table.getString(i, "City");
    let year = table.getNum(i, "Year");
    let days = table.getNum(i, "Yellow-Dust Days");
    let dotColor = table.getString(i, "Color");


    // Position
    let cityIndex = cities.indexOf(city);

    let x = map(year, 2020, 2025, 260, 850);

    let y = 210 + cityIndex * 80;


    // Dot Size
    let dotSize = map(days, 0, maxDays, 10, 44);


    // Hover with mouse
    let distance = dist(mouseX, mouseY, x, y);

    if (distance < dotSize / 2) {

      hoveredRow = i;

      dotSize = dotSize * 1.2;
		
      stroke("#282522");
      strokeWeight(1);

    } else {

      noStroke();

    }

    fill(dotColor);
    ellipse(x, y, dotSize, dotSize);

  }


  // Hover details
  if (hoveredRow !== -1) {

    let city = table.getString(hoveredRow, "City");
    let year = table.getNum(hoveredRow, "Year");
    let days = table.getNum(hoveredRow, "Yellow-Dust Days");

    fill("#282522");
    noStroke();

    textAlign(LEFT);
    textSize(16);

    text(
      city + " · " + year + " · " + days + " days",
      260,
      135
    );

  } else {

 }
}