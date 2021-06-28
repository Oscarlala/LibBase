import React, {useState} from 'react';
import './AddBook.css';

const AddBook = ({ add, goBack }) => {
    const [search, setSearch] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [isbn, setISBN] = useState("")
    const [lang, setLang] = useState("")
    const [pubDate, setPubDate] = useState("")
    const [image, setImage] = useState("")
    const [bookInfo, setBookInfo] = useState({})

    const handleClick = async (value) => {
        let query
        if(!isNaN(search)) {
            query = search
        } else {
            alert("Ange endast siffror")
            return
        }
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
        const json = await response.json()

        // console.log("JSON", json)

        // const filtered = json.items.filter(el => el.volumeInfo.industryIdentifiers[0].identifier === query)

        // console.log("FILTERED", filtered)
        
        if(json.totalItems === 0) {
            alert("Inget resultat hittades")
            return
        }

        populate(json.items[0].volumeInfo)
    }

    const populate = (volumeInfo) => {
        setTitle(volumeInfo.title)
        setAuthor(volumeInfo.authors.toString())
        setISBN(search)
        setLang(volumeInfo.language)
        setPubDate(volumeInfo.publishedDate)
        setImage(volumeInfo.imageLinks.thumbnail)

        setBookInfo(
            {
                "title": volumeInfo.title,
                "author": volumeInfo.authors.toString(),
                "isbn": search,
                "lang": volumeInfo.lang,
                "pubDate": volumeInfo.publishedDate,
                "image": volumeInfo.imageLinks.thumbnail
            }
        )
    }

    return(
        <div className="addBook">
            <h2>Sök på ISBN</h2>
            <div className="searchContainer">
                <input
                    className='bookSearchBar'
                    type='text'
                    placeholder="Sök efter bok"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className='button' onClick={() => handleClick()}>Sök</button>
            </div>
            <div className="bookInfoContainer">
                <img className="bookImg" src={image} alt="failed to load" />
                <div className="bookInfo">
                    <p>Titel</p>
                    <input type="text" placeholder={title} />
                    <p>Författare</p>
                    <input type="text" placeholder={author} />
                    <p>ISBN</p>
                    <input type="text" placeholder={isbn} />
                    <p>Språk</p>
                    <input type="text" placeholder={lang} />
                    <p>Publiceringsdatum</p>
                    <input type="text" placeholder={pubDate} />
                </div>
            </div>
            <div id="buttonContainer">
                <button className='button' id="addButton" onClick={() => add(bookInfo)}>Lägg till</button>
                <button className='button' id="backButton" onClick={() => goBack()}>Gå tillbaka</button>
            </div>
        </div>
    )
}

export default AddBook