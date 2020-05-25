const List = require('./list');
const Item = require('./item');

module.exports = (userAccountService, listService,itemService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await userAccountService.dao.db.query("CREATE TABLE useraccount(id SERIAL PRIMARY KEY, name TEXT NOT NULL,login TEXT NOT NULL, challenge TEXT NOT NULL)");
            await listService.dao.db.query("CREATE TABLE list(id SERIAL PRIMARY KEY, shop TEXT NOT NULL, date DATE, archived BOOLEAN, useraccount_id INTEGER, FOREIGN KEY (useraccount_id) REFERENCES useraccount(id))");
            await itemService.dao.db.query("CREATE TABLE item(id SERIAL PRIMARY KEY, quantite NUMERIC, label TEXT, checked BOOLEAN, listid INTEGER, FOREIGN KEY (listId) REFERENCES list(id) ON DELETE CASCADE)")
        }catch(e)  {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
            } else {
                reject(e)
            }
            return
        }
        userAccountService.insert("User1", "user1@example.com", "azerty")
            .then(_ => userAccountService.dao.getByLogin("user1@example.com"))
            .then(async user1 => {
                for (let i = 0; i < 5; i++) {
                    await listService.dao.insert(new List("Shop" + i, new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),  user1.id))
                }
            })
            .then(async () => {
                for (let i = 1; i < 6; i++) {
                    await itemService.dao.insert(new Item("Label" + i,i*i,false,1))
                }
            });
        userAccountService.insert("User2", "user2@example.com", "azerty1")
            .then(_ => userAccountService.dao.getByLogin("user2@example.com"))
            .then(async user2 => {
                for (let i = 0; i < 4; i++) {
                    await listService.dao.insert(new List("Shop" + i, new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),  user2.id))
                }
                resolve()
            })
            .then(async () => {
                for (let i = 1; i < 6; i++) {
                    await itemService.dao.insert(new Item("Label" + i,i*i,false,2))
                }
            });
    })
};