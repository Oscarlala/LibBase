import React from 'react';
import './Book.css';

const Book = ({bookInfo, goBack}) => {
    return (
        <div className="bookPage">
            <div id="header">
                <button onClick={() => goBack()}>Gå tillbaka</button>
            </div>
            <div id="mainContainer">
                {bookInfo ? <BookData bookInfo={bookInfo} /> : <p>No entries found</p>}
            </div>
        </div>
    ); 
}

const BookData = ({bookInfo}) => (
    <>
        {bookInfo.map(book => (    
            <div className="book">
                <img className="bookImage" src={book.image} alt="failed to load" />
                 <div className="infoList">
                    <p>{`Titel: ${book.title}`}</p>
                    <p>{`Författare: ${book.author}`}</p>
                    <p>{`ISBN: ${book.ISBN}`}</p>
                    <p>{`Språk: ${book.lang}`}</p>
                    <p>{`Publiceringsdatum: ${book.pubDate}`}</p>
                </div>
            </div>
        ))}
    </>
)

export default Book;