const express = require('express');
const app = express();
const path = require('path');

const router = require('./routes/route');

const PORT = process.env.PORT || 5000;

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});