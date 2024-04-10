import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import '../CSS/CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(5);
  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then(response => {
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching characters data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    filterCharacters(event.target.value, selectedGender);
  };

  const handleGenderFilter = (event) => {
    setSelectedGender(event.target.value);
    setCurrentPage(1);
    filterCharacters(searchTerm, event.target.value);
  };

  const filterCharacters = (search, gender) => {
    let filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );

    if (gender !== '') {
      filtered = filtered.filter((character) =>
        character.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    setFilteredCharacters(filtered);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const nextPage = () => {
    if (indexOfLastCharacter < filteredCharacters.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="filter-options">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedGender} onChange={handleGenderFilter}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="n/a">N/A</option>
        </select>
      </div>
      <div className="character-list">
        {currentCharacters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: Math.ceil(filteredCharacters.length / charactersPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
        ))}
        <button onClick={nextPage} disabled={indexOfLastCharacter >= filteredCharacters.length}>Next</button>
      </div>
    </>
  );
};

export default CharacterList;
