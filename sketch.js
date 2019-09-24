const pos = {};
let lineDist = 20;
let startingAngle = 0;
let previousPoints = [];
let potentialColors = ["#9F86C0", "#BE95C4", "#E0B1CB", "#EACBDC", "#F5E5EE", "#FFF"];
let sketchBackground = "#5E548E";

function setup() {
  pixelDensity(1);
  frameRate(30);
  canvas = createCanvas(800, 800);
  canvas.parent('sketch');
  background(255, 255, 255);
  strokeWeight(10);
  pos.x = width/2;
  pos.y = height/2;
  pos.angle = startingAngle;
  previousPoints.push({x: pos.x, y: pos.y});
  stroke(shuffle(potentialColors)[0]);
  textFont('Georgia', 20);
  background(sketchBackground);
}


function draw() {
  drawNextLine();
  checkIfStartOver();
}

function drawNextLine() {
  let addToAngle = Math.random() < .5 ? 60 : -60;
  let v = p5.Vector.fromAngle(radians(pos.angle+addToAngle), lineDist);
  let vx = v.x + pos.x;
  let vy = v.y + pos.y;

  // if (isCollison(vx, vy) && Math.random() < .9) {
  //   addToAngle *= -1
  //   v = p5.Vector.fromAngle(radians(pos.angle+addToAngle), lineDist);
  //   vx = v.x + pos.x;
  //   vy = v.y + pos.y;
  // }

  line(pos.x, pos.y, vx, vy);

  pos.x = vx;
  pos.y = vy;
  pos.angle +=addToAngle;
}

function isCollison(x, y) {
  for (let i = 0; i < previousPoints.length; i++) {
    let previousPoint = previousPoints[i];

    if (Math.round(previousPoint.x) === Math.round(x) && Math.round(previousPoint.y) === Math.round(y)) {
      return true;
    }
  }

  return false;
}

function checkIfStartOver() {
  if (isCollison(pos.x, pos.y) || pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) {
    pos.x = width/2;
    pos.y = height/2;
    previousPoints = [];
    stroke(shuffle(potentialColors)[0]);
    if (Math.random() > .9) {
      background(sketchBackground);
      startingAngle = Math.random() * 360;
    }
    pos.angle = startingAngle;
  } else {
    previousPoints.push({x: pos.x, y: pos.y});
  }
}
