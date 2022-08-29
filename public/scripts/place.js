class Place {
    constructor (id, name, price, color, rents) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.color = color;
        this.rents = rents;

        this.owner = null;
        this.playerOnTop = [];
        this.isBuyable = !isNaN(price);
        this.isJail = name == "Jail";
        this.isCard = ["Fate", "Chance"].includes(name);
        this.isStart = name == "Start";

        if (id < 9) {
            this.baseY = 0;
            this.baseX = (id % 9) * gridLength;
        } else if (id < 17) {
            this.baseX = 8 * gridLength;
            this.baseY = (id - 8) * gridLength;
        } else if (id < 25) {
            this.baseX = (8 - (id - 16)) * gridLength;
            this.baseY = 8 * gridLength;
        } else {
            this.baseX = 0;
            this.baseY = (8 - (id % 8)) * gridLength;
        }
    }

    draw() {
        stroke(0);
        strokeWeight(1);
        fill(this.color);
        rect(
            this.baseX, this.baseY,
            gridLength, gridLength
        );


        fill(["lightskyblue", "white", "pink", "yellow"].includes(this.color) ? 0 : 255);
        noStroke();

        textSize(gridLength * .13);
        text(this.name, this.baseX, this.baseY, gridLength, gridLength);


        for (let [i, player] of Object.entries(this.playerOnTop)) {
            player.draw(
                this.baseX + pieceSize * i, this.baseY + gridLength * .5
            );
        }
    }

    add(player, arg) {
        // Arg:
        // If its starting square arg represent if this is the starting position
        // If its jail arg represent if this is just pass by or not


        this.playerOnTop.push(player);

        if (this.isStart) {
            if (!arg) {
                player.bal += 200;
            }
        } else if (this.isJail) {
            if (!arg) {
                player.atJail = 3;
            }
        } else if (this.isCard) {
            // TODO: Give player card
        }
    }

    remove(player) {
        this.playerOnTop.splice(this.playerOnTop.indexOf(player));
    }
}
