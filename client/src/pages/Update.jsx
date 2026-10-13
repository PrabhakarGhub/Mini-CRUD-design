import React from 'react'
import { useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
    })

    const navigate = useNavigate()
    const location = useLocation()

    const id = location.pathname.split('/')[2]

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books/" + id)
                setBook(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchBook()
    }, [id])

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async e => {
        e.preventDefault();

        try{
            await axios.put("http://localhost:8800/books/"+id, book)
            navigate('/')
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className='form'>
            <h1>Update Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title" value={book.title}/>
            <input type="text" placeholder='desc' onChange={handleChange} name="desc" value={book.desc}/>
            <input type="number" placeholder='price' onChange={handleChange} name="price" value={book.price || ""}/>
            <input type="text" placeholder='cover' onChange={handleChange} name="cover" value={book.cover}/>

            <button className='formbutton' onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update