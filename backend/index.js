const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config.json');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const userRouter = require('./routes/user')

app.get('/api/v1', (req, res) => {
    res.send('Welcome to the API');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/user', userRouter);

const port = process.env.PORT || config.port
app.listen(port, () => {
    console.log(`QKart Backend running at port http://localhost:${port}/api/v1`);
});

