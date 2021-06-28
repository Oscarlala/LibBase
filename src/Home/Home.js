import React, {useState} from 'react';
import './Home.css';

const Home = ({ search, addBook }) => {
  const [ title, setTitle ] = useState("Ange Titel");
  const [ clickedIndex, setClickedIndex ] = useState(0)
  const [ searchString, setSearchString ] = useState("")

  const handleClick = (newTitle, index) => {
    setTitle(newTitle)
    setClickedIndex(index)
  }

  return (
    <div className='home'>
      <div className='search'>
        <div className="mainContent">
        <input
          className='searchBar'
          type='text'
          title='title'
          placeholder={title}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <div className='links'>
          <h3
            onClick={() => handleClick("Ange Titel", 0)}
            className={`${
              clickedIndex === 0 ? 'active' : 'inactive'
            }`}
          >
            Sök på titel
          </h3>
          <h3
            onClick={() => handleClick("Ange Författare", 1)}
            className={`${
              clickedIndex === 1 ? 'active' : 'inactive'
            }`}
           >
            Sök på författare
          </h3>
          <h3
            onClick={() => handleClick("Ange ISBN", 2)}
            className={`${
              clickedIndex === 2 ? 'active' : 'inactive'
            }`}
          >
            Sök på ISBN
          </h3>
        </div>
        <div className="buttonContainer">
          <button className='button' onClick={() => search(searchString)}>
            Sök
          </button>
          <button className='button' onClick={() => addBook()}>
            Lägg till bok
          </button>
      </div>
      </div>
      </div>
      
    </div>
  );
}

export default Home;
