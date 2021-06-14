import { json } from 'express';
import React from 'react';
import './AddBook.css';

const AddBook = () => {

    const handleClick = async () => {
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=harry+potter")
        const json = await response.json()
    }

    return(
        <div className="addBook">
            <input
                className='bookSearchBar'
                type='text'
                title='title'
                placeholder="Sök efter bok"
            />
            <button className='button' onClick={() => handleClick()}>
          Sök
        </button>
        <div className="bookInfo">
            <input type="text" />
        </div>
        </div>
    )
}

export default AddBook