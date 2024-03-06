import express from 'express';
import diaryRouter from './routes/diaries';
import units from './units/index';
import products from './products/index'




const app = express();
app.use(express.json());  //middleware to parse json

const PORT = 3000;

app.get('/', (req, res) => {
    console.log("🚀 ~ app.get ~ req:", req)
    console.log("someone hit the endpoint")
    res.send('Hello World');
});

app.use('/api/diaries', diaryRouter);
app.use('/api/units', units);
app.use('/api/products', products);



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})