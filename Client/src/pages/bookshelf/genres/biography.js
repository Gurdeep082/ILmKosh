import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlipBook from './flipbook';

const Biography = ({ gener }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/type/${gener}`);
        const filteredBooks = response.data.items.filter(book => book.volumeInfo.imageLinks?.thumbnail);
        // Add a dummy PDF file path for demonstration purposes
        const booksWithPdf = filteredBooks.map(book => ({
          ...book,
          file: './Books/a-rubber-bridge-too-far-obooko.pdf', // Replace with actual PDF file path
          numPages: 100, // Replace with actual number of pages if available
        }));
        setBooks(booksWithPdf);
      } catch (error) { 
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [gener]);

  const handleReadClick = (book) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className='Main'>
      <style>
        {`
          .books-list {
            display: grid;
            grid-gap: 20px;
            margin: 0 auto;
            padding: 0 20px;
            margin-bottom: 100px;
          }
          .book-item:hover {
            transform: scale(1.1);
          }
          .book-item {
            background-color: #F0E2C6;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            z-index: 2;
            grid-template-rows: auto 1fr auto;
            justify-items: center;
          }
          .book-item button {
            border-radius: 10px;
          }
          .popup-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
          }
          .popup-content {
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            width: 80%;
            max-width: 800px;
            max-height: 80%;
            overflow-y: auto;
            position: relative;
          }
          .popup-content button {
            margin-top: 10px;
            background-color: #D8C3A5;
            border: none;
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
          }
          .popup-content h2 {
            margin-top: 0;
          }
          .popup-content p {
            font-size: 1.1em;
            margin-top: 20px;
          }
        `}
      </style>
      <h1 style={{ fontFamily: "Italianno, system-ui", color: "#D8C3A5", fontWeight: "550", fontSize: "50px", textAlign: "center" }}>
        Free Books
      </h1>
      <div className="books-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-item">
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                onError={(e) => e.target.style.display = 'none'} // Hide the image if an error occurs
              />
              <h3 className="booktitle">
                {book.volumeInfo.title}
              </h3>
              <p className="booktitle">{book.volumeInfo.authors?.join(', ')}</p>
              <button onClick={() => handleReadClick(book)}>Read</button>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
      {isPopupOpen && selectedBook && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>{selectedBook.volumeInfo.title}</h2>
            <p>{selectedBook.volumeInfo.description || 'No description available.'}</p>
            <button onClick={handleClosePopup}>Close</button>
            <FlipBook book={selectedBook} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Biography;
