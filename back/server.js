const express        = require('express'); 
const MongoClient    = require('mongodb').MongoClient; 
const bodyParser     = require('body-parser'); 
const app            = express(); 
const port = 8000; 

const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const url = "mongodb+srv://PopovIO:PopovIO@popovio.lbnuy.mongodb.net/?retryWrites=true&w=majority&appName=PopovIO";

const client = new MongoClient(url);
const dbName = 'PopovIO';

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  return client;
}

main()
  .then(async (client) => {
    require('./routes/index')(app, client);

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  })
  .catch(console.error)
  .finally(() => client.close());


