import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './App.css';
import HomePage from './Home/Home';
import BookPage from './Book/Book';
import AddBookPage from './AddBook/AddBook'

class App extends Component {
    
  render() {
    return (
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/search' render={(props) => (
          <BookPage bookInfo={props.location.state.bookInfo}/>
        )} />
        <Route path='/add' exact component={AddBookPage} />
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

const getBook = async(searchString) => {
  const response = await fetch(`/get?title=${searchString}`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }

  return body
};

export default App;
