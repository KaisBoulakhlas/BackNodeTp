const BaseDAO = require('./basedao')

module.exports = class ItemDAO extends BaseDAO {
    constructor(db) {
        super(db,"item")
    }

    insert(item) {
        return this.db.query("INSERT INTO item(quantite,label,checked,listId) VALUES($1,$2,$3,$4)",
            [item.quantite, item.label, item.checked, item.listid])
    }

    getByIdItem(id) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM item WHERE id=$1`, [id])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }

    getAllItemsOfList(listId) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM item WHERE listid=$1 ORDER BY quantite,label",[listId])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getAllItems() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM item ORDER BY quantite,label")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    updateItem(item) {
        return this.db.query("UPDATE item SET quantite=$2,label=$3,checked=$4,listid=$5 WHERE id=$1",
            [item.id, item.quantite, item.label, item.checked,item.listid])
    }
};