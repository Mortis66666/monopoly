
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
    }

    draw(place) {

    }

    add(player) {
        this.playerOnTop.push(player);
    }

    remove(player) {
        this.playerOnTop.splice(this.playerOnTop.indexOf(player));
    }
}
