const express = require("express");
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const app = express();
const authRouter = require('./routers/authRouter');
const postsRouter = require('./routers/postsRouter');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

dotenv.config('./.env');

const PORT = process.env.PORT || 4001;
dbConnect();
app.use(express.json());

app.use(morgan('common'));
app.use(cookieParser());
app.use('/auth',authRouter);

app.use('/posts',postsRouter)

app.get("/",(req,res)=>{
    res.status(200).send("ok from server ");
})

app.listen(PORT,()=>{
    console.log(`listening on PORT: ${PORT}`);
})

 