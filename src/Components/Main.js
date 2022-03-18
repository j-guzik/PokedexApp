import pokeball from '../pokemon.jpg';
import Row from './Row';
import Info from './Info';
import axios from 'axios';
import {useEffect, useState} from "react";
import Modal from 'react-modal/lib/components/Modal';
import {useFilters} from 'react-table';
import ColumnFilter from './ColumnFilter';


function Main() {

  const [data, setPokeData] = useState([])
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl]=useState();
  const [prevUrl, setPrevUrl]=useState();
  const [pokeDex,setPokeDex]=useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

const pokeFun=async()=>{
  setLoading(true);
  const res = await axios.get(url);
  setNextUrl(res.data.next);
  setPrevUrl(res.data.previous);
  getPokemon(res.data.results);
  setLoading(false);
}

const getPokemon=async(res)=> {
  res.map(async(item)=>{
    const result= await axios.get(item.url)
    setPokeData(state=>{
      state=[...state,result.data]
      state.sort((a,b)=>a.id>b.id?1:-1)
      return state;
    })
  })
}


useEffect(()=>{
  pokeFun();
}, [url])

  return (
    <div className="Main">
    {/* <div className="Pokemon">
        <img src={pokeball} className="Pokeball" alt="pokeball" />
    </div> */}
    <main>
    <div className="container">
            <h3 className="p-3 text-center">List of pokemons</h3>
           <Modal isOpen={modalIsOpen}>
            <div>
              <Info data={pokeDex}/>
              <button onClick={()=>setModalIsOpen(false)}>Close</button>
            </div>
            </Modal>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name 
                          <div>{ColumnFilter.canFilter ? ColumnFilter.render('Filter'):null}</div>
                          </th>                     
                        <th>Type</th>
                        <th>Sprite</th>
                    </tr>
                </thead>
                <tbody>
                  <Row pokemon={data} loading={loading} infoPokemon={poke=>setPokeDex(poke)} modal={m=>setModalIsOpen(m)}/>
                </tbody>
            </table>

            <div className='btn-group'>
              <button onClick={()=>{
                setPokeData([]);
                setUrl(prevUrl)
              }}>Previous</button>
              <button onClick={()=>{
                setPokeData([]);
                setUrl(nextUrl)
              }}>Next</button>
            </div>
           
            
        </div>
        
      
    </main>
    </div>
  );
}

export default Main;