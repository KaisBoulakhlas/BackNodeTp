const BaseDAO = require('./basedao')

module.exports = class ListDAO extends BaseDAO {
    constructor(db) {
        super(db, "list")
    }

    insert(list) {
        return this.db.query("INSERT INTO list(shop,date,archived,useraccount_id) VALUES($1,$2,$3,$4)",
            [list.shop, list.date, list.archived, list.useraccount_id])
    }

    getByIdList(id) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM list WHERE id=$1`, [id])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }


    getAllLists(user) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list WHERE archived=false AND useraccount_id=$1 ORDER BY id",[user.id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    updateList(list) {
        return this.db.query("UPDATE list SET shop=$2,date=$3,archived=$4 WHERE id=$1",
            [list.id, list.shop, list.date, list.archived])
    }

    getListsArchived(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list WHERE archived=true ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getShareById(list_id, user_id){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT list.id, shop, date, archived, useraccount_id, user_id, droit FROM list INNER JOIN partage ON list.id = list_id WHERE list.id = ${list_id} AND user_id = ${user_id}`)
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    };

}