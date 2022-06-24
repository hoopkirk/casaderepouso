const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

try {
    app.listen(3000);
    console.log('SERVIDOR CLIENT PORT: 3000')
} catch (error) {
    console.error(error.message);
}
