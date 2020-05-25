const ItemDAO = require("../datamodel/itemdao");

module.exports = class ItemService {
    constructor(db) {
        this.dao = new ItemDAO(db)
    }

    isValid(item) {
        if (item.quantite === "") return false;
        item.label = item.label.trim();
        if (item.label === "") return false;
        if ((item.quantite != null) && (item.quantite < 0)) return false;
        return true
    }
};