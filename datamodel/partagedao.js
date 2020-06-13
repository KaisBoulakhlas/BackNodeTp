const BaseDAO = require('./basedao');

module.exports = class PartageDAO extends BaseDAO {
    constructor(db) {
        super(db, 'partage');
    };

    insert(partage) {
        return this.db.query("INSERT INTO partage(user_id, list_id, droit) VALUES ($1,$2,$3)",
            [partage.user_id, partage.list_id, partage.droit]);
    };

    getAllShareListByUser(id) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM partage INNER JOIN list ON list.id = list_id INNER JOIN useraccount ON useraccount.id = user_id WHERE useraccount_id = $1 ORDER BY list_id", [id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)));
    };

    getAllShareByListId(id) {
        console.log('id :', id);
        return new Promise((resolve, reject) =>
            this.db.query("SELECT partage.id, user_id, list_id, droit, name, login,date,shop FROM partage INNER JOIN useraccount ON useraccount.id = user_id INNER JOIN list ON list.id = list_id  WHERE list_id = $1 ORDER BY user_id", [id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)));
    };

    getById(id){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM partage WHERE id=$1", [id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)));
    };

    getAllShareList(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT list.id, shop,date,user_id,list_id, droit FROM list INNER JOIN  partage ON list.id = list_id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)));
    };

    updateShare(partage) {
        return this.db.query("UPDATE partage SET user_id=$2, list_id=$3, droit=$4 WHERE id=$1",
            [partage.id, partage.user_id, partage.list_id, partage.droit]);
    };

}