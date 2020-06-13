module.exports = (app, servicePartage,serviceList, serviceUser,jwt) => {
    app.get("/share", jwt.validateJWT, async (req, res) => {
        try {
            res.json(await servicePartage.dao.getAllShareListByUser(req.user.id))
        }
        catch (e) {
            console.log(e);
            res.status(500).end()
        }
    });

    app.get("/share/:login", jwt.validateJWT, async (req,res) => {
        try{
            const user = await serviceUser.dao.getByLogin(req.params.login);
            console.log(user)
            if(user === undefined){
                return res.status(404).end();
            }

            return res.json(user)
        }
        catch (e) {
            console.log(e);
            res.status(400).end();
        }
    })

    app.get("/shareList/:id", jwt.validateJWT, async (req, res) => {
        try{
            const list = await serviceList.dao.getByIdList(req.params.id);
            if (!(!!list)) return res.status(404).end();
            if (list.useraccount_id !== req.user.id) return res.status(403).end();
            const partage = await servicePartage.dao.getAllShareByListId(list.id);
            return res.json(partage);

        }
        catch (e) {
            console.log(e);
            res.status(400).end();
        }
    });

    app.get("/partage/:id", jwt.validateJWT, async (req, res) => {
        try {
            const share = await servicePartage.dao.getById(req.params.id);
            console.log(share)

            if (share.user_id === req.user.id) {
                return res.status(403).end()
            }

            if (share === undefined || share.length === 0) {
                return res.status(404).end();
            } else{
                console.log(share)
                res.json(share);
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).end();
        }
    });

    app.get("/shareLists", jwt.validateJWT, async (req,res) =>{
        try{
            res.json(await servicePartage.dao.getAllShareList())
        }

        catch (e) {
            console.log(e);
            res.status(400).end();
        }
    });

    app.post("/share", jwt.validateJWT, async (req,res) => {
        try{
            const partage = req.body;
            const list = await serviceList.dao.getByIdList(partage.list_id);
            const user = await serviceUser.dao.getById(partage.user_id);
            if (!servicePartage.isValid(partage)){
                return res.status(400).end()
            }
            if (list === undefined || user === undefined) {
                return res.status(404).end()
            }

            if (list.useraccount_id !== req.user.id || partage.user_id === req.user.id) {
                return res.status(403).end()
            }
            servicePartage.dao.insert(partage)
                .then(res.status(200).end())
                .catch(e => {
                    console.log(e);
                    res.status(500).end()
                })
        }
        catch (e) {
            console.log(e);
            res.status(400).end();
        }
    })

    app.put("/share", jwt.validateJWT, async (req, res) => {
        const partage = req.body;
        const list = await serviceList.dao.getByIdList(partage.list_id);
        const user = await serviceUser.dao.getById(partage.user_id);

        if (!servicePartage.isValid(partage)) {
            return res.status(400).end()
        }

        if (list.useraccount_id !== req.user.id || partage.user_id === req.user.id) {
            return res.status(403).end()
        }
        if (user === undefined || list === undefined) {
            return res.status(404).end()
        }

        servicePartage.dao.updateShare(partage)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e);
                res.status(500).end();
            })
    });

}