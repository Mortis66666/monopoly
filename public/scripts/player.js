class Player {
    constructor(name, color, bank) {
        this.name = name;
        this.color = color;
        this.bal = 1500;
        this.at = null;
        this.atJail = 0;
        this.jailFree = 0;
        this.properties = [];

        if (bank) {
            this.bal = Infinity;
        }
    }

    static bank() {
        return new Player("bank", "grey", true);
    }

    goTo(place) {
        this.at.remove(this);
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

    draw(x, y) {
        textSize(pieceSize * .5);

        fill(this.color);
        noStroke();
        ellipse(
            x + pieceSize * .5, y + pieceSize * .5,
            pieceSize, pieceSize
        );

        fill((this.color != "yellow") * 255);
        text(
            this.name[0],
            x + pieceSize * .5,
            y * 1.3
        );
    }
}