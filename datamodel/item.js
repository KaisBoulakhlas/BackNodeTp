module.exports = class Item {
    constructor(label, quantite,checked, listid) {
        this.label = label;
        this.quantite = quantite;
        this.checked = checked;
        this.listid = listid
    }

    toString() {
        return `${this.quantite} ${this.label}`
    }
};