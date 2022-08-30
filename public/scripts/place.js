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
        this.isGoToJail = name == "Go to jail";

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

        if (this.isBuyable) {
            if (id < 8) {
                this.housePrice = 50;
            } else if (id < 16) {
                this.housePrice = 100;
            } else if (id < 24) {
                this.housePrice = 150;
            } else {
                this.housePrice = 200;
            }
        }

        this.house = 0;
        this.hotel = 0;
    }

    get rent() {
        if (!this.house) {
            return this.rents[0];
        } else if (this.hotel) {
            return this.rents[-1];
        } else {
            return this.rents[this.house];
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
        text(this.name + (this.owner ? `\n(Owned by ${this.owner.name})` : ""), this.baseX, this.baseY, gridLength, gridLength);


        for (let [i, player] of Object.entries(this.playerOnTop)) {
            if (player.bal >= 0) {
                player.draw(
                    this.baseX + pieceSize * i, this.baseY + gridLength * .5
                );
            }
        }

        let size = gridLength * .25;

        if (this.hotel) {
            image(
                hotelImg,
                this.baseX + gridLength * .5 - size, this.baseY,
                size, size
            );
        } else if (this.house) {
            for (let i = 0; i < this.house; i++) {
                image(
                    houseImg,
                    this.baseX + i * size, this.baseY,
                    size, size
                );
            }
        }
    }

    add(player, arg) {
        this.playerOnTop.push(player);
    }

    remove(player) {
        this.playerOnTop.splice(this.playerOnTop.indexOf(player), 1);
    }
}
