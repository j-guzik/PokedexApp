function Info({data}) {
    console.log(data);
    return (
<>
{
    (!data)?"":(
        <>
        <div>
            <h1>{data.name}</h1>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="poke"/>
            <div>
                <div>
                    <p>Height: {data.height}</p>
                
                </div>
                <div>
                <p>Weight: {data.weight}</p>
                
                </div>
            </div>        
        </div>
        </>
    )
}
</>
    );
  }
  
  export default Info;

  