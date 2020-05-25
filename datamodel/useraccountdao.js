const BaseDAO = require('./basedao');

module.exports = class UserAccountDAO extends BaseDAO {
    constructor(db) {
        super(db, "useraccount")
    }
    insert(user) {
        return this.db.query("INSERT INTO useraccount(name,login,challenge) VALUES ($1,$2,$3)",
            [user.name, user.login, user.challenge])
    }
    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE login=$1", [login])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }
};