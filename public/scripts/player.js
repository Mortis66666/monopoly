
const pieceRadius = 25;

class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.bal = 1500;
        this.at = null;
        this.atJail = 0;
        this.properties = [];
    }

    goTo(place) {
        this.at = place;
        place.add(this);
    }

    goToJail() {
        this.atJail = 3;
    }

    draw(x, y) {
        textSize(pieceRadius);

        fill(this.color);
        noStroke();
        ellipse(
            x + pieceRadius, y + pieceRadius,
            pieceRadius * 2, pieceRadius * 2
        );

        fill(255);
        text(
            this.name[0],
            x * 1.15,
            y * 1.3
        );
    }
}