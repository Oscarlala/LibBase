import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import './App.css';
import HomePage from './Home/Home';
import BookPage from './Book/Book';
import AddBookPage from './AddBook/AddBook'

class App extends Component {
    
  render() {
    return (
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/search' render={ (props) => <Search bookInfo={props.location.state.bookInfo} /> }/>
        <Route path='/add' exact component={AddBook} />
      </Router>
    );
  }
}

const Home = () => {
  const history = useHistory();
  return <HomePage search={async (searchString) => {
    const bookInfo = await getBook(searchString)
    history.push({
      pathname: '/search',
      state: {bookInfo: bookInfo}
    })
  }}
    addBook={() => {
      history.push({
        pathname: '/add'
      })
    }}
  />;
}

const Search = ({bookInfo}) => {
  const history = useHistory();
  
  return <BookPage bookInfo={bookInfo} goBack={() => {
      history.push({
        pathname: '/'
      })
    }}
  />
}

const AddBook = () => {
  const history = useHistory();

  return <AddBookPage add={async (bookInfo) => {
    await postBook(bookInfo)
  }} 
    goBack={() => {
      history.push({
        pathname: '/'
      })
    }}
  />;
}

const getBook = async(searchString) => {
  const response = await fetch(`/get?title=${searchString}`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }

  return body
};

const postBook = async (bookInfo) => {
 const response = await axios.post("/add", { bookInfo: bookInfo })

  alert(response.data)
}

export default App;
