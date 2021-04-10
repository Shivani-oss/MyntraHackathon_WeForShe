import express from 'express'
// import data from './data'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter  from './routes/userRouter'
import productRouter from './routes/productRouter'


dotenv.config()

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shopify' ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).catch(error => console.log(error.reason))

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.get('/', (req, res) => {
    res.send('Server is ready')
})


// error catcher 
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000

app.listen(5000, () => {console.log(`Server started at http://localhost:${port}`)} )

//babel - es6 - es5(node understand)

