import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterList from './Components/CharacterList';
import ErrorComponent from './Components/ErrorComponent';
import Header from './Components/Header';
import Footer from './Components/Footer';
import  Loader  from './Components/Loader'


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setCharacters(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="App">
      <Header/>
      {loading  && <Loader/>}
      {error && <ErrorComponent message={error} />}
      {characters.length > 0 && (
        <CharacterList/>
      )}
      <br></br>
      <Footer/>
    </div>
  );
};

export default App;
