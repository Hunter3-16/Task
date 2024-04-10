import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/CharacterCard.css';
import '../CSS/CharacterList.css';
import CharacterModal from './CharacterModal';

const CharacterCard = ({ character }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    if (character.species.length > 0) {
      axios.get(character.species[0])
        .then(response => {
          setSpecies(response.data);
        })
        .catch(error => {
          console.error('Error fetching species data:', error);
        });
    }
  }, [character.species]);

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="character-card"
        onClick={handleCardClick}
        style={{
          flex: '0 0 calc(33.33% - 20px)',
          margin: '10px',
          padding: '10px',
          backgroundColor: species && species.name === 'Droid' ? 'green' : 'black',
          border: '5px solid #ffc107',
          borderRadius: '5px',
          transition: 'transform 0.2s ease-in-out, border-color 0.3s ease, background-color 0.3s ease',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <img src={`https://picsum.photos/200?random=${Math.random()}`} alt={character.name} />
        <h3>{character.name}</h3>
        {species && <h3> Species: {species.name}</h3>}
      </div>
      {modalOpen && <CharacterModal character={character} onClose={closeModal} />}
    </>
  );
};

export default CharacterCard;
