import { useEffect, useState } from 'react';
import './App.css';

const PokeListItem = (props) => {
  const versionItems = props.data.versions.map((version) => 
    <div className='poke-list-item'>{version.substring(0,3)}</div>
  );

  const [catchStatusClass, setCatchStatusClass] = useState(() => {
    if (props.data.caught) return 'inactive'
    return 'active'
  })

  const [catchCheck, setCatchCheck] = useState(props.data.caught);

  const handleCatchClick = () => {
    if (catchStatusClass === 'active') {
      setCatchStatusClass('inactive');
      setCatchCheck(1);
    }
    else {
      setCatchStatusClass('active');
      setCatchCheck(0);
    }

    props.handleCatchClick(props.data.id)
  }

  return <tr onClick={handleCatchClick} className={`poke-list-item ${catchStatusClass}`}>
    <td>{props.data.id}</td>
    <td>{props.data.name}</td>
    <td>{props.data.types[0]}</td>
    <td>{props.data.types[1]}</td>
    <td className='version-table'>
      {versionItems}
    </td>
    <td><input type='checkbox' checked={catchCheck} /></td>
  </tr>
}

function App() {
  const [pokeList, setPokeList] = useState();

  useEffect(() => {
    fetch('http://localhost:8008/pokemon/')
    .then(response => response.json())
    .then(data => setPokeList(data.map(pokemon => <PokeListItem data={pokemon} handleCatchClick={handleCatchClick}/>
    )));
  }, []);

  const handleCatchClick = (id) => {    
    fetch(`http://localhost:8008/catch/${id}`)
    .then(data => {
      let updatedPokeList = pokeList.map( (poke) => {
        if (poke.id === id) return <PokeListItem data={data} handleCatchClick={handleCatchClick}/>
        else return poke;
      })

      setPokeList(updatedPokeList);
    });
  }

  return (

    <div className="wrapper">
      <h1>Catch Tracker</h1>

      <table className='poke-list-table'>
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Type 1</th>
          <th>Type 2</th>
          <th>Versions</th>
          <th>Caught?</th>
        </thead>

        {pokeList}
      </table>

      
    </div>
  );
}

export default App;