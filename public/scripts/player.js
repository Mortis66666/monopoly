class Player {
    constructor(color, bank) {
        this.color = color;
        this.bal = 1500;
        this.at = null;
        this.atJail = 0;
        this.jailFree = 0;
        this.properties = [];
        
        this.name = color.toUpperCase();

        if (bank) {
            this.bal = Infinity;
        }
    }

    static bank() {
        return new Player("bank", "grey", true);
    }

    goTo(place) {
        if (this.at) {
            this.at.remove(this);
        }
        this.at = place;
        place.add(this);
    }

    goToJail() {
        this.atJail = 3;
    }

    give(player, amt) {
        this.bal -= amt;
        player.bal += amt;
    }

    pass() {
        this.atJail -= 1;
        return true;
    }

    draw(x, y) {
        textSize(pieceSize * .5);

        fill(this.color);
        stroke(0);
        strokeWeight(1);
        ellipse(
            x + pieceSize * .5, y + pieceSize * .5,
            pieceSize, pieceSize
        );

        if (this.atJail) {
            line(x, y, x + pieceSize, y + pieceSize);
            line(x + pieceSize, y, x, y + pieceSize);
        }

    }
}