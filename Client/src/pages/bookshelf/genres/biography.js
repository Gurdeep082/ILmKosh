import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlipBook from './flipbook'; // Adjust the import path as necessary


const Biography = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=biography&key=AIzaSyCSvSsw52clyt8ozO8HuXn6u6H7_PwtfOU&maxResults=39`);
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
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
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
            border: 2px solid #D8C3A5;
            background-color: #D8C3A5;
            padding: 5px 10px;
          }
          .book-item img {
            width: auto;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
          }
          .book-item h3 {
            font-size: 1em;
            margin-top: 10px;
          }
          .book-item p {
            font-size: 0.9em;
            color: #666;
          }
          @media (min-width: 1200px) {
            .books-list {
              grid-template-columns: repeat(6, 1fr);
            }
          }
          @media (min-width: 768px) and (max-width: 1199px) {
            .books-list {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          @media (max-width: 767px) {
            .books-list {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .booktitle {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 200px;
          }
          
          .popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000; /* Ensure the popup is on top */
          }
          .popup-content {
            background: white;
            padding: 20px;
            border-radius: 5px;
            position: relative;
            z-index: 1001; /* Ensure the content is on top of the overlay */
          }
          .popup-content button {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1002; /* Ensure the button is on top of the content */
          }
        `}
      </style>
      <h1 style={{ fontFamily: "Italianno, system-ui", color: "#D8C3A5", fontWeight: "550", fontSize: "50px", textAlign: "center" }}>
        Biography Books
      </h1>
      <div className="books-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-item" onClick={() => handleBookClick(book)}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                onError={(e) => e.target.style.display = 'none'} // Hide the image if an error occurs
              />
              <h3 className="booktitle">
                {book.volumeInfo.title}
              </h3>
              <p className="booktitle">{book.volumeInfo.authors?.join(', ')}</p>
              <button onClick={() => handleBookClick(book)}>Read</button>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={closePopup}>Close</button>
            <FlipBook book={selectedBook} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Biography;

