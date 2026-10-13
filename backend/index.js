import "dotenv/config"
import express from "express"
import mysql from "mysql2"
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.get('/', (req, res) => {
    res.json("hello, this is the backend.!");
})

app.get('/books', (req, res) => {
    const q = 'SELECT * FROM books'

    db.query(q,(err, data) => {
        if(err){
            res.json(err);
            return;
        }
        res.json(data);
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const q = 'SELECT * FROM books WHERE id = ?';

    db.query(q, [id], (err, data) => {
        if(err){
            res.status(500).json(err);
            return;
        }
        res.json(data[0]);
    })
})

app.post('/books', (req, res) => {
    const q = 'INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?,?,?,?)'
    const {title, desc, price, cover} = req.body;

    db.query(q, [title, desc, price, cover], (err, data) => {
        if(err){
            res.json(err);
            return;
        }
        res.json('Book has been created successfully!.');
    })
})

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    
    const q = 'DELETE FROM books WHERE id = ?'

    db.query(q, [id], (err, data) => {
        if(err){
            res.json(err);
            return;
        }
        res.json('Book has been deleted successfully.')
    })
})

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const { title, desc, price, cover } = req.body;

    const q = 'UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?';

    db.query(q, [title, desc, price, cover, id], (err, data) => {
        if(err){
            res.status(500).json(err);
            return;
        }
        res.json('Book updated successfully.');
    })
})

const PORT = process.env.DB_PORT || 8800;

app.listen(8800, () => {
    console.log('connected to backend!.1')
})