module.exports = (app, serviceList,jwt) => {
    app.get("/list", jwt.validateJWT, async (req, res) => {
      try{
          res.json(await serviceList.dao.getAllLists(req.user))

      } catch(err){
            console.log(err);
            res.status(500).end()
      }
    });

    app.get("/listArchived", jwt.validateJWT,async (req, res) => {
        try{
            res.json(await serviceList.dao.getListsArchived())

        } catch(err){
            console.log(err);
            res.status(500).end()
        }
    });

    app.get("/listShare/:id", jwt.validateJWT, async (req, res) => {
        try {
                const list = await serviceList.dao.getShareById(req.params.id, req.user.id);
                console.log(list)
                if (!(!!list)) {
                    return res.status(404).end();
                }
                if (list.user_id !== req.user.id) {
                    return res.status(403).end();
                }
                return res.json(list);
        }
        catch (e) {
            console.log(e);
            res.status(400).end();
        };
    });


    app.get("/list/:id",jwt.validateJWT, async (req, res) => {
        try{
            const list = await serviceList.dao.getByIdList(req.params.id);
            if (list === undefined){
                return res.status(404).end();
            }

            if(await serviceList.dao.getByIdList(req.params.id) === undefined){
                res.status(404).end()
            } else{
                res.json(await serviceList.dao.getByIdList(req.params.id))
            }
        } catch(err){
            console.log(err);
            res.status(500).end()
        }
    });

    app.post("/list",jwt.validateJWT, (req, res) => {
        const list = req.body;
        if (!serviceList.isValid(list))  {
            return res.status(400).end()
        }
        list.useraccount_id = req.user.id;
        serviceList.dao.insert(list)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e);
                res.status(500).end()
            })
    });

    app.delete("/list/:id",jwt.validateJWT, async (req, res) => {
        const list = await serviceList.dao.getByIdList(req.params.id)
        if (list === undefined) {
            return res.status(404).end()
        }

        console.log(list.useraccount_id)
        console.log(req.user.id)

        if (list.useraccount_id !== req.user.id) {
            return res.status(403).end()
        }

        serviceList.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e);
                res.status(500).end()
            })
    });

    app.put("/list",jwt.validateJWT, async (req, res) => {
        const list = req.body;
        if ((list.id === undefined) || (list.id == null) || (!serviceList.isValid(list))) {
            return res.status(400).end()
        }

        if (list.useraccount_id !== req.user.id) {
            return res.status(403).end()
        }
        if (await serviceList.dao.getByIdList(list.id) === undefined) {
            return res.status(404).end()
        }
        serviceList.dao.updateList(list)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e);
                res.status(500).end()
            })
    })
};
