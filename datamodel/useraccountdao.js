const BaseDAO = require('./basedao');

module.exports = class UserAccountDAO extends BaseDAO {
    constructor(db) {
        super(db, "useraccount")
    }
    insert(user) {
        return this.db.query("INSERT INTO useraccount(name,login,challenge) VALUES ($1,$2,$3)",
            [user.name, user.login, user.challenge])
    }

    getAllUsers(id){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT id, name, login FROM useraccount WHERE id <> $1",[id])
                .then(res => resolve(res.rows) )
                .catch(e => reject(e)));
    };

    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE login=$1", [login])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }

    getById(id){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE id=$1", [id])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    };
};