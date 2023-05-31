import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const apiURL = "https://pokeapi.co/api/v2/pokemon/";

  const getPokemonName = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(`${apiURL}${name}`);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getPokemon();
  }, [name]);

  return (
    <div className="App">
      <input type="text" placeholder="search pokemon" onChange={getPokemonName} />
      {data && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Abilities</th>
              <th>Types</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.name}</td>
              <td>
                {data.abilities && data.abilities.map((ability) => ability.ability.name).join(", ")}
              </td>
              <td>
                {data.types && data.types.map((type) => type.type.name).join(", ")}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}


