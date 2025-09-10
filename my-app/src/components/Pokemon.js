import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css';

const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [curUrl, setcurUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setnextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [searchData, setSearchdata] = useState(null);
    const [Iserror , setError] =useState({status:false , msg:""});
    const URL = "https://pokeapi.co/api/v2/pokemon/";

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchVal(e.target.value);

    }
    console.log(searchVal);

    const nextPage = () => {
        setcurUrl(nextUrl);
    }

    const prevPage = () => {
        setcurUrl(prevUrl);
    }

    const fetchPokemon = async (ApiUrl) => {
        setIsLoading(true);
        try {
            const response = await axios.get(ApiUrl);
            let pokemonData = response.data.results;
            setnextUrl(response.data.next)
            setPrevUrl(response.data.previous);
            let pokemonArray = [];
            for (let i = 0; i < pokemonData.length; i++) {
                const res = await axios.get(pokemonData[i]?.url)
                pokemonArray.push(res.data)
            }
            setPokemon(pokemonArray);
            setIsLoading(false)

        }
        catch (err) {
            console.log(err);
        }
        console.log(pokemon)

    };

    useEffect(() => {
        fetchPokemon(curUrl);

    }, [curUrl])

    console.log(isLoading);

    

    const searchRes = async (ApiUrl) => {
        setIsLoading(true);
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchVal}/`);
        setSearchdata(response.data)
        setError({status:false , msg:""});
        setIsLoading(false);

        }
        catch(e){
            setError(({status:true , msg:e.message}))
        }

        
    }
  
    if(Iserror.status===true){
        return(
            <h1>{Iserror.msg}</h1>
        )

    }
    console.log(searchData);
    // const colorCode = ["#70e0bb", "#fe9441", "#A2D7D5", "#f6edb4", "#dcbb5e", "#a48aae"];
    const colorCode = {
        fire: "#fe9441",
        green: '#70e0bb',
        water: "#A2D7D5",
        normal: "#f6edb4",
        bug: "#dcbb5e",
        poison: " #CF9FFF",
        electric: "#FFFF00",
        ground: "#fffdd0",
        fairy: "#ffceb4",
        fighting: "#C41E3A"

    };

    return (
        <div>
            <h1>Pokedex</h1>
            <input type="text" value={searchVal} onChange={handleSearch} placeholder="Search for Pokemon" className='inputField'></input><button className='searchbtn' onClick={searchRes}>Search</button>
            {
                (isLoading ? <h1>Loading......</h1> : <div>
                      

            {
                searchData ?
                    <div className='card' style={{ backgroundColor: colorCode[searchData.types[0].type.name] }} key={searchData.id}>

                        <div className='PokemonTxt'>
                            <h3>{searchData.name}</h3>
                            <button>{searchData.types[0].type.name}</button>
                            {

                                searchData.types[1]?.type.name ? <button>{searchData.types[1]?.type.name}</button> : ""


                            }

                        </div>
                        <div className='PokeImg'>
                            <img src={searchData.sprites.other.

                                dream_world.front_default} />
                        </div>

                    </div>
                    :


                    <ul>
                        {pokemon.map((item) => {
                            return (
                                <li className='card' style={{ backgroundColor: colorCode[item.types[0].type.name] }} key={item.id}>

                                    <div className='PokemonTxt'>
                                        <h3>{item.name}</h3>
                                        <button>{item.types[0].type.name}</button>
                                        {

                                            item.types[1]?.type.name ? <button>{item.types[1]?.type.name}</button> : ""


                                        }

                                    </div>
                                    <div className='PokeImg'>
                                        <img src={item.sprites.other.

                                            dream_world.front_default} />
                                    </div>
                                    <div className='Infobtn'>
                                        <button>Info</button>
                                    </div>



                                </li>
                            )




                        })}
                    </ul>

                //)

            }



            <div className='nxtprev'>
                {
                    prevUrl ? <button onClick={prevPage} >Previous</button> : ""
                }

                <button  onClick={nextPage}>Next</button>
            </div>
                </div>)
            }
            
            


        </div>


    )
}

export default Pokemon;