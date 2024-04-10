import React , {useEffect , useState} from 'react';
import  axios  from 'axios';
import '../CSS/CharacterModal.css';


const CharacterModal = ({ character, onClose }) => {

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear().toString();
      
        return `${day}-${month}-${year}`;
      }

      
    const [homeworld, setHomeworld] = useState('');
    useEffect(() => {
        axios.get(character.homeworld)
          .then(response => {
            setHomeworld(response.data);
          })
          .catch(error => {
            console.error('Error fetching homeworld data:', error);
          });
      }, [character.homeworld]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>back</span>
        <h2>{character.name}</h2>
        <p>Height: {character.height} cm</p>
        <p>Mass: {character.mass} kg</p>
        <p>Hair Color: {character.hair_color}</p>
        <p>Skin Color: {character.skin_color}</p>
        <p>Eye Color: {character.eye_color}</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Eye Color: {character.eye_color}</p>
        <p>Gender: {character.gender}</p>
        <p>Number of Films before Birth: {character.films.length}</p>
        <p>Homeworld: {homeworld.name}</p>
        <p>Homeworld Terrain: {homeworld.terrain}</p>
        <p>Homeworld Climate: {homeworld.climate}</p>
        <p>Homeworld Amount of Residents: {homeworld.population}</p>
        <p>Created Date: {formatDate(character.created)}</p>
        <p></p>
      </div>
    </div>
  );
};

export default CharacterModal;
