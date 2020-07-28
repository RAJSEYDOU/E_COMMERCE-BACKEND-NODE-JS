function pagination(model) {
    try {
        return async function(req, res, next) {

            let objet = {};
            let page = parseInt(req.query.page)
            let limitNumber = parseInt(req.query.limitNumber)

            const start = (page - 1) * limitNumber
            const end = limitNumber

            const data = await model.find().limit(end).skip(start).exec()
            objet.result = data;


            if (start > 0) {
                objet.prev = {
                    page: page - 1,
                    limit: limitNumber
                }
            }

            if (end < 9) {
                objet.next = {
                    page: page + 1,
                    limit: limitNumber
                }

            }


            res.json(objet)
            next()


        }


    } catch (error) {
        res.status(401).send('pagination error')

    }



}
module.exports = pagination