import React, { useState, useEffect } from 'react';
import './bookshelf.css';
import { useNavigate } from 'react-router-dom';

const genres = [
  { name: 'Fiction', color: '#3E2723', urdu: 'افسانہ' },
  { name: 'Mystery', color: '#4B2E2E', urdu: 'پراسرار' },
  { name: 'Sci-Fi', color: '#D8C3A5', urdu: 'سائنس فکشن' },
  { name: 'Romance', color: '#E97451', urdu: 'رومانوی' },
  { name: 'Biography', color: '#3E2723', urdu: 'سوانح حیات' },
  { name: 'History', color: '#4B2E2E', urdu: 'تاریخ' },
  { name: 'Philosophy', color: '#D8C3A5', urdu: 'فلسفہ' },
  { name: 'Poetry', color: '#E97451', urdu: 'شاعری' },
];

let Books = [];
let selectedGenre = '';

const Ilmkosh = () => {
  const [selectedGenreState, setSelectedGenreState] = useState('');
  const [hoveredBook, setHoveredBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedGenreState) {
      const fetchBooks = async () => {
        try {
          navigate(`/genre/${selectedGenreState}`, { state: { genre: selectedGenreState } });
        } catch (error) {
          console.error(error);
        }
      };
      fetchBooks();
    }
  }, [selectedGenreState, navigate]);

  const handleGenreClick = (genre) => {
    setSelectedGenreState(genre);
    selectedGenre = genre;
  };

  return (
    <div className="ilmkosh">
      <div className="bookshelf">
        {genres.map((genre, index) => (
          <div
            key={genre.name}
            className="book"
            style={{
              backgroundColor: genre.color,
              color: '#FFD700', // Gold text for a royal look
              fontFamily: 'Georgia, serif', // A more royal, elegant font
            }}
            onMouseEnter={() => setHoveredBook(index)}
            onMouseLeave={() => setHoveredBook(null)}
            onClick={() => handleGenreClick(genre.name)}
          >
            <span className="book-title">
              {hoveredBook === index ? genre.urdu : genre.name}
            </span>
            {hoveredBook === index && (
              <div className="book-info">
                {/* <h3>{genre.name}</h3> */}
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

const Genre = () => selectedGenre;

export { Books, Genre };
export default Ilmkosh;
