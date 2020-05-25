module.exports = (app, serviceItem,jwt) => {
    app.get("/items/:id",jwt.validateJWT, async (req, res) => {
        try{
            res.json(await serviceItem.dao.getAllItemsOfList(req.params.id))
        } catch(err){
            console.log(err);
            res.status(500).end()
        }
    });

    app.get("/item/:id",jwt.validateJWT, async (req, res) => {
        try{
            if(await serviceItem.dao.getByIdItem(req.params.id) === undefined){
                res.status(404).end()
            } else{
                res.json(await serviceItem.dao.getByIdItem(req.params.id))
            }
        } catch(err){
            console.log(err);
            res.status(500).end()
        }
    });

    app.get("/items",jwt.validateJWT, async (req, res) => {
        try{
            res.json(await serviceItem.dao.getAllItems())

        } catch(err){
            console.log(err);
            res.status(500).end()
        }
    });

    app.post("/item",jwt.validateJWT, (req, res) => {
        const item = req.body;
        if (!serviceItem.isValid(item))  {
            return res.status(400).end()
        }
        serviceItem.dao.insert(item)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e);
                res.status(500).end()
            })
    });

    app.delete("/item/:id",jwt.validateJWT, async (req, res) => {
        const item = await serviceItem.dao.getByIdItem(req.params.id)
        if (item === undefined) {
            return res.status(404).end()
        }
        serviceItem.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e);
                res.status(500).end()
            })
    });

    app.put("/item",jwt.validateJWT, async (req, res) => {
        const item = req.body;
        if ((item.id === undefined) || (item.id == null) || (!serviceItem.isValid(item))) {
            return res.status(400).end()
        }
        if (await serviceItem.dao.getByIdItem(item.id) === undefined) {
            return res.status(404).end()
        }
        serviceItem.dao.updateItem(item)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e);
                res.status(500).end()
            })
    })

};


