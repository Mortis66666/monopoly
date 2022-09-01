const gridWidth = 9;
const gridHeight = 9;
const gridLength = 85;
const bank = Player.bank();

const placesReference = [
    ["Start", NaN, "white", []], // Start !!!
    ["Old Kent Road", 60, "brown", [2, 10, 30, 90, 160, 250]],
    ["Fate", NaN, "purple", []],
    ["Whitechapel Road", 60, "brown", [4, 20, 60, 180, 320, 450]],
    ["The Angel, Islington", 100, "lightskyblue", [6, 30, 90, 270, 400, 550]],
    ["Euston Road", 100, "lightskyblue", [6, 30, 90, 270, 400, 550]],
    ["Chance", NaN, "purple", []],
    ["Pentonville Road", 120, "lightskyblue", [8, 40, 100, 300, 450, 600]],
    ["Jail", NaN, "white", []], // Jail !!!
    ["Pall Mall", 140, "pink", [10, 50, 150, 450, 625, 750]],
    ["Whitehall", 140, "pink", [10, 50, 150, 450, 625, 750]],
    ["Northumberland Avenue", 160, "pink", [12, 60, 180, 500, 700, 900]],
    ["Fate", NaN, "purple", []],
    ["Bow Street", 180, "orange", [14, 70, 200, 550, 750, 950]],
    ["Marlborough Street", 180, "orange", [14, 70, 200, 550, 750, 950]],
    ["Vine Street", 200, "orange", [16, 80, 220, 600, 800, 1000]],
    ["Nothing lol", NaN, "white", []], // Nothing, lol!!!
    ["Strand", 220, "red", [18, 90, 250, 700, 875, 1050]],
    ["Chance", NaN, "purple", []],
    ["Fleet Street", 220, "red", [18, 90, 250, 700, 875, 1050]],
    ["Trafalgar Square", 240, "red", [20, 100, 300, 750, 925, 1100]],
    ["Leicester Square", 260, "yellow", [22, 110, 330, 800, 975, 1150]],
    ["Coventry Street", 260, "yellow", [22, 110, 330, 800, 975, 1150]],
    ["Piccadilly", 280, "yellow", [24, 120, 360, 850, 1025, 1200]],
    ["Go to jail", NaN, "white", []], // Go to jail!!!
    ["Regent Street", 300, "green", [26, 130, 390, 900, 1100, 1275]],
    ["Oxford Street", 300, "green", [26, 130, 390, 900, 1100, 1275]],
    ["Fate", NaN, "purple", []],
    ["Bond Street", 320, "green", [28, 150, 450, 1000, 1200, 1400]],
    ["Park Lane", 350, "darkblue", [35, 175, 500, 1100, 1300, 1500]],
    ["Chance", NaN, "purple", []],
    ["Mayfair", 400, "darkblue", [50, 200, 600, 1400, 1700, 2000]],
];

const reasonGain = [
    "You won a lottery",
    "You sold a computer",
    "You found some money on the floor and pick it up",
    "You gets their scholarship",
    "You pretend to be a begger and someone donate them some money",
    "You robbed the bank",
    "You sold a bitcoin",
    "You won a math competition",
];

const reasonLost = [
    "You need to pay their school fee",
    "You get robbed",
    "You didn't wear mask when going out",
    "You simply park their car and kena saman",
    "You was caught for robbing the bank",
    "You bought a Iphone 13 pro max",
    "You lost a bet"
];

const places = [];

const players = [];
const amt = +document.getElementById("amt").innerHTML;
const colors = ["red", "green", "yellow", "blue"]

const pieceSize = gridLength / amt;

const info = document.getElementById("info");
const btn = document.getElementById("fbtn");

var turn = 0;
var stage = "move";

let houseImg;
let hotelImg;

let someoneWon = false;

function setup() {
    let canvas = createCanvas(gridWidth * gridLength, gridHeight * gridLength);
    canvas.parent("canvas");

    for (let [id, args] of Object.entries(placesReference)) {
        places.push(new Place(+id, ...args));
    }

    for (let i = 0; i < amt; i++) {
        let player = new Player(colors[i]);
        player.goTo(places[0]);
        players.push(player);
    }

    houseImg = loadImage("house.png");
    hotelImg = loadImage("hotel.png")


    textStyle(BOLD);
    textAlign(CENTER, CENTER);
}

function draw() {
    clear();
    for (let place of places) {
        place.draw();
    }

    for (let [i, player] of Object.entries(players)) {
        fill(player.color);
        stroke(0);
        strokeWeight(3);
        ellipse(
            1.5 * gridLength,
            (1.5 + +i) * gridLength,
            gridLength * .5
        );

        textSize(gridLength);

        text(
            `$${player.bal}`,
            2 * gridLength,
            (1 + +i) * gridLength,
            6 * gridLength,
            gridLength
        )
    }

    let curr = players[turn];

    let msg = `${curr.name}'s turn`;

    if (stage == "move") {
        btn.innerHTML = "Roll";
        btn.onclick = () => {
            pos = curr.at.id;
            pos += dice();

            if (pos > 31) {
                bank.give(curr, 200);
                alert(`Player ${curr.name} gets $200 for passing the starting square!`);
                pos -= 32;
            }


            curr.goTo(places[pos]);
            stage = "do";
        }
    } else if (stage == "do") {
        let at = curr.at;
        if (at.isBuyable) {
            if (!at.owner) {
                if (at.price <= curr.bal) {
                    if (confirm(`Buy ${at.name} for $${at.price}?`)) {
                        at.owner = curr;
                        curr.properties.push(at);
                        curr.give(bank, at.price);
                        stage = "end";
                    } else {
                        stage = "end";
                    }
                } else {
                    stage = "end";
                }
            } else if (at.owner == curr) {
                if (at.housePrice <= curr.bal) {
                    if (at.house < 4) {
                        if (confirm(`Buy house for $${at.housePrice}?`)) {
                            at.house += 1;
                            curr.give(bank, at.housePrice)
                            stage = "end";
                        } else {
                            stage = "end";
                        }
                    } else if (at.house == 4 && at.hotel == 0) {
                        if (confirm(`Buy hotel for $${at.housePrice}?`)) {
                            at.hotel += 1;
                            curr.give(bank, at.housePrice)
                            stage = "end"
                        } else {
                            stage = "end";
                        }
                    } else {
                        stage = "end";
                    }
                } else {
                    stage = "end";
                }
            } else if (at.owner != curr && !at.owner.atJail) {
                alert(`Player ${curr.name} gives player ${at.owner.name} $${at.rent} for steping their properties!`);
                curr.give(at.owner, at.rent);
                stage = "end";
            } else {
                stage = "end";
            }
        } else if (at.isCard) {
            
            let gain = randint(0, 1);
            let amount = randint(10, 300);
            let reason;

            if (gain) {
                reason = reasonGain[randint(0, reasonGain.length - 1)];
                bank.give(curr, amount);
            } else {
                reason = reasonLost[randint(0, reasonLost.length - 1)];
                curr.give(bank, amount);
            }

            alert(reason.replaceAll("You", `Player ${curr.name}`) + `, ${gain ? "gained" : "lost"} $${amount}`);

            stage = "end"
        } else if (at.isGoToJail) {
            alert(`Player ${curr.name} goes to jail and can't play for three turns!`);
            curr.goToJail();
            curr.goTo(places[8]);
            stage = "end";
        } else {
            stage = "end";
        }

        stage = "end";


    } else if (stage == "end") {
        next();
    }

    info.innerHTML = msg;
    info.className = "";
    btn.className = "";

    info.classList.add(curr.color);
    btn.classList.add(curr.color);

    for (let player of players) {
        if (player.bal < 0) {
            alert(`${player.name} bankrupted!`);
            players.splice(players.indexOf(player), 1);
        }
    }

    if (!someoneWon) {
        if (players.length == 1) {
            alert(`Player ${players[0].name} won!`);
            someoneWon = true;
        }
    }

}

function randint(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function dice() {
    return randint(2, 12);
}

function next() {
    do {
        turn++;
        if (turn == players.length) {
            turn = 0;
        }
    } while (+players[turn].atJail && players[turn].pass());
    stage = "move";
}

function nextStage() {
    switch (stage) {
        case "move":
            stage = "do";
            break;
        case "do":
            stage = "end";
            break;
    }
}
