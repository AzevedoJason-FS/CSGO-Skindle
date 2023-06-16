const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const itemCtrl = require ('./controllers/items')
const leaderboardCtrl = require ('./controllers/leaderboard')

// Connect to MongoDB
const connectMongo = async () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,    
        })
        console.log(`MongoDB connected`)
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
}

app.use(cors())
app.use(express.json());

app.get('/api/items', itemCtrl.getItems)
app.get('/api/leaderboard', leaderboardCtrl.getLeaderboard)
app.post('/api/add-items', itemCtrl.addItems)
app.post('/api/add-user-leaderboard', leaderboardCtrl.addUserLeaderboard)

//Connect to MongoDB before listening
connectMongo().then(() => {
    app.listen(8080, () => {
        console.log(`Ready for Requests`)
    })
})



