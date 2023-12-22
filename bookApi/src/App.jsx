import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ErrorImage from './images/error.avif'
import Logo from './images/Group 1.svg'
import SimpleForm from './component/SimpleForm';

function App() {
  const [datas, setDatas] = useState('f');
  const [filterBooks, setFilterBooks] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async (query) => {
    try {
      const response = await axios.post('https://reactnd-books-api.udacity.com/search',{
          query,
          maxResults: 10,
        },{ headers: { Authorization: 'whatever-you-want',content : "Application/json" }}
      );

      if (response.data.books.error === 'empty query') {
        setError('No results found');
        setFilterBooks([]); 
      } else {
        setFilterBooks(response.data.books);
        setError('');
        console.log('Response from server:', response.data.books);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(datas);
  }, [datas]);

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setDatas(inputValue);
  };

  const [visible, setVisible] = useState(false);

  const openForm = () => {
    setVisible(true);
  };

  const closeForm = () => {
    setVisible(false);
  };
//  To render(first render) and mount the initial value.
  useEffect(() => {
    fetchData(datas);
  }, []);

  return (
    <>
      <div className='nav'>
        <div>
          <img src={Logo} alt="" />
        </div>
        <div id='inputbox'>
          <input
            type='search'
            className='searchbar'
            placeholder='type a letter to search'
            value={datas}
            onChange={handleSearchChange}
          />
        </div>

        <button className='register' onClick={openForm}>Log In</button>
      </div>

      {error && (
        <div className='error-container'>
          <img className='errorImage' src={ErrorImage} alt="errorImage" />
        </div>
      )}

      <div className='Booklist'>
        {filterBooks.map((book) => (
          <div key={book.id}>
            <img src={book.imageLinks?.thumbnail} alt='' />
            <h4> {book.title} </h4>
            {/* <p className='categories'>{book.categories}</p> */}
            <h5 className='authors'>{book.authors}</h5>
            <p className='rating'>{book.averageRating ? `${book.averageRating}⭐| Free`: "Free"} </p>
          </div>
        ))}
      </div>

      {visible && <SimpleForm onClose={closeForm} />}
    </>
  );
}

export default App;
