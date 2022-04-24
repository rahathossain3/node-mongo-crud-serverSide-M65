//1-3
const express = require('express');
const cors = require('cors'); // for cors
const { MongoClient, ServerApiVersion } = require('mongodb');   //mongodb

const app = express();
const port = process.env.PROT || 5000;


//use middleware  { for post important too}
app.use(cors());
app.use(express.json());


// user: dbuser1
// password: TQ5NJyagnGzgDnfn

//mongodb codes start---------------------------------------------------


const uri = "mongodb+srv://dbuser1:TQ5NJyagnGzgDnfn@cluster0.mdrpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// send data function 
async function run() {

    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        // post a data-----(get data from client side)-***************************************
        app.post('/user', (req, res) => {

            const newUser = req.body;
            console.log('adding new user', newUser);
            res.send({ result: 'success' })
        });


        /* const user = { name: 'monona nodi', email: 'mohonanodi@gmail.com' };
        const result = await userCollection.insertOne(user);
        console.log(`user inserted  with id ${result.insertedId}`) */
    }
    finally {
        // continue database use korle  client.close() use kora jaba na
        // await client.close();
    }

}

// call function 
run().catch(console.dir);


//mongodb codes End------------------------------------------------------------


//4
app.get('/', (req, res) => {
    res.send('Running my Node CRUD Server')
});


//5
app.listen(port, () => {
    console.log('CRUD Server is Running');
})