module.exports = function (app, client) {

    app.post('/notes/add', async (req, res) => {
            const note = {
                body: req.body.body,
                title: req.body.title
            };

            console.log(req.body);
            const url = "mongodb+srv://PopovIO:PopovIO@popovio.lbnuy.mongodb.net/?retryWrites=true&w=majority&appName=PopovIO";

            await client.connect();

            await client.db("PopovIO").collection('notes').insertOne(note);
            res.send(note)
        });

    app.get('/notes/all', async (req, res) => {
        const url = "mongodb+srv://PopovIO:PopovIO@popovio.lbnuy.mongodb.net/?retryWrites=true&w=majority&appName=PopovIO";

        await client.connect();
        const note = await client.db("PopovIO").collection('notes').find({}).toArray();

        res.send(note)
        });

    app.patch('/notes/update', async (req, res) => {
        const url = "mongodb+srv://PopovIO:PopovIO@popovio.lbnuy.mongodb.net/?retryWrites=true&w=majority&appName=PopovIO";
    
        await client.connect();
        const note = await client.db("PopovIO").collection('notes').updateOne({title: req.query.title}, { $set: {body: req.body.newText}})
        res.send(note)
    })
    app.delete('/notes/delete', async (req,res) => {
        const url = "mongodb+srv://PopovIO:PopovIO@popovio.lbnuy.mongodb.net/?retryWrites=true&w=majority&appName=PopovIO";
    
        await client.connect();
        const note = await client.db("PopovIO").collection('notes').deleteOne({title: req.query.title})
        res.send(note)
    })
    
    }
 