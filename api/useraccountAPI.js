module.exports = (app, svc, jwt) => {
    app.post('/useraccount/authenticate', (req, res) => {
        const { login, password } = req.body
        console.log(req.body)
        if ((login === undefined) || (password === undefined)) {
            console.log(req.body)
            res.status(400).end()
            return
        }

        svc.validatePassword(login, password)
            .then(authenticated => {
                if (!authenticated) {
                    res.status(401).end();
                    return
                }
                res.json({'token': jwt.generateJWT(login)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })

    })
    app.get("/useraccount", jwt.validateJWT, async (req, res) => {
        try {
            const user = await svc.dao.getAllUsers(req.user.id);
            console.log('user', user)
            if (!(!!user)) return res.status(404).end();
            return res.json(user);
        }
        catch (e) {
            console.log(e);
            res.status(400).end();
        }
    });




}