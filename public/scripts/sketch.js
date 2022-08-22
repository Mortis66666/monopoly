const gridWidth = 9;
const gridHeight = 9;
const gridLength = 69;

const places = [
    ["Start", NaN, "white", []],
    ["Old Kent Road", 60, "brown", [2, 10, 30, 90, 160, 250]],
    ["Whitechapel Road", 60, "brown", [4, 20, 60, 180, 320, 450]],
    ["The Angel, Islington", 100, "lightskyblue", [6, 30, 90, 270, 400, 550]],
    ["Euston Road", 100, "lightskyblue", [6, 30, 90, 270, 400, 550]],
    ["Pentonville Road", 120, "lightskyblue", [8, 40, 100, 300, 450, 600]],
    ["Pall Mall", 140, "pink", [10, 50, 150, 450, 625, 750]],
    ["Whitehall", 140, "pink", [10, 50, 150, 450, 625, 750]],
    ["Northumberland Avenue", 160, "pink", [12, 60, 180, 500, 700, 900]],
    ["Bow Street", 180, "orange", [14, 70, 200, 550, 750, 950]],
    ["Marlborough Street", 180, "orange", [14, 70, 200, 550, 750, 950]],
    ["Vine Street", 200, "orange", [16, 80, 220, 600, 800, 1000]],
    ["Strand", 220, "red", [18, 90, 250, 700, 875, 1050]],
    ["Fleet Street", 220, "red", [18, 90, 250, 700, 875, 1050]],
    ["Trafalgar Square", 240, "red", [20, 100, 300, 750, 925, 1100]],
    ["Leicester Square", 260, "yellow", [22, 110, 330, 800, 975, 1150]],
    ["Coventry Street", 260, "yellow", [22, 110, 330, 800, 975, 1150]],
    ["Piccadilly", 280, "yellow", [24, 120, 360, 850, 1025, 1200]],
    ["Pacific Avenue Regent Street", 300, "green", [26, 130, 390, 900, 1100, 1275]],
    ["Oxford Street", 300, "green", [26, 130, 390, 900, 1100, 1275]],
    ["Bond Street", 320, "green", [28, 150, 450, 1000, 1200, 1400]],
    ["Park Lane", 350, "darkblue", [35, 175, 500, 1100, 1300, 1500]],
    ["Mayfair", 400, "darkblue", [50, 200, 600, 1400, 1700, 2000]],
];


var player = new Player("mortis", "red");

function setup() {
    let canvas = createCanvas(gridWidth * gridLength, gridHeight * gridLength);
    canvas.parent("canvas");
}

function draw() {
    player.draw(100, 100);
}