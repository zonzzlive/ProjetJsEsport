import React, {useState, useEffect} from "react";
import GameCard from "./game/GameCard";

const ORIGIN = `${window.location.protocol}//${window.location.hostname}:3000`;

export default function Games(){
      const [games, setGames] = useState([])

      useEffect(()=>{
            async function getGameData(){
                  const res = await fetch(`${ORIGIN}/games`)
                  const data = await res.json()
                  console.log(data)
                  setGames(data);
            }

            getGameData()
      }, [])



      return (
            <div className="games">
                  <h1>Jeux</h1>
                  <div className="game-card-container">
                        {games.length > 0 ? games.map(el=> <GameCard key={el.id} name={el.name} description={el.description} image_url={el.image_url} slugGame={el.slug} bg={el.bg}/>) : "Loading"}
                  </div>
            </div>
      )
}