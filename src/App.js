import './App.css';
import { useState } from 'react';
import _ from 'lodash';

function CharacterCard(props) {
  const { item } = props;

  return (
    <div className='character-card' key={item.id}>
      <img src={item.image} className="character-card__photo" alt="photo" width={200} height={200} />
      <div className="character-card__content">
        <div className="character-card__section" >{item.name}</div>
        <div className="character-card__section" >{`${item.status} - ${item.species}`}</div>
        <div className="character-card__section" >{`gender: ${item.gender}`}</div>
      </div>
    </div>
  );
}

function App() {
  const [names, setNames] = useState();

  const onClick = async () => {
    let url = 'https://rickandmortyapi.com/api/character';
    let response = await fetch(url);
    let commits = await response.json();
    setNames(commits.results);
  };

  return (
    <div className="App">
      <input type={'text'}></input>
      <button onClick={onClick}>поиск</button>
      <div className='content-container'>
        {_.map(names, (item) => <CharacterCard item={item} />)}
      </div>
    </div>
  );
}

export default App;
