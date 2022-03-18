
const Row=({pokemon, loading, infoPokemon, modal})=> {


    console.log(pokemon);
    return (
        <>
        {
            loading ? <h1>Loading</h1>:
            pokemon.map( (item)=> {
                return(
                    <>
        <tr key={item.id} onClick={()=>infoPokemon(item)}>
            <td>{item.id}</td>
            <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
            <td>{item.types.map(poke=>{
                return(
                    <div>{poke.type.name}</div>
                )
            })}</td>
            <td><img src={item.sprites.front_default}/></td>
            {/* <td>{item.abilities.map(poke=>{
                return(
                    <div>{poke.ability.name}</div>
                )
            })}</td> */}
            <td><button key={item.id} onClick={()=>{infoPokemon(item); modal(true)}}>Show</button></td>
        </tr>
                    </>
                    
                )
            }

            )
        }

        </>
    );
  }
  
  export default Row;
