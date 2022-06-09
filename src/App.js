import { useState } from 'react';
import './App.css';
import pokedex from './pokedex' 

const PokeCard = (props) => {
  const [isActive, setIsActive] = useState(true)

  const handleClick = () => {
    setIsActive(current => !current)
  }

  const {id, name} = props.pokemon
  const icon = `data/icons/${id.substring(1)}.png`
  console.log(icon)

  return <div className='card' onClick={handleClick} style={{ backgroundColor: isActive ? 'white' : 'lightgrey' }}>
    <img src={icon} alt='pokemon icon'/>
    <p>
      <div className='id-number'>
        {id} -
      </div>
      {name}
    </p>
  </div>
}

const Header = (props) => {
  return <div className='header'>
    Catch Tracker
  </div>
}

const App = () => {
  const [pokemon, setPokemon] = useState(pokedex)

  return <div> 
    <Header />
    <div className='card-wrapper'>
      {pokemon.map( pokemon => <PokeCard pokemon={pokemon} />)}
    </div>
  </div>
}

export default App;