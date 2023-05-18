const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routers = require('./routers');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/User', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.use('/', routers);

app.listen(9999, () => {
    console.log('server is running,on port 9999');
})