import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../../assets/images/logo.png"
import bg from "../../assets/images/background/background-team.png"
import PlayerCard from "../player/PlayerCard";

const ORIGIN = `https://api.pandascore.co/`;
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN



export default function Team(){
      
      let { slug } = useParams();
      const [team, setTeam] = useState({
            current_videogame: {
                  slug:"loading"
            },
            players:[]
            
      });

      async function getTeamBySlug(slug){

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
            };

            fetch(`${ORIGIN}teams/${slug}`, requestOptions)
                  .then(response => response.json())
                  .then(result => setTeam(result))
                  .catch(error => console.log('error', error));
      }

      console.log(team)
      useEffect(() => {
            console.log(TOKEN)
            getTeamBySlug(slug)
            window.scrollTo(0, 0)
      }, []);
      
      return (
            <div className="team-unique">
                  <div className="team-herobanner">
                        <div className="team-background">
                              <img src={bg} alt="background"/>
                              <div className="overlay"></div>
                        </div>
                        <div className="team-infos">
                              <div className="team-logo">
                                    <img src={team.image_url != null ? team.image_url : logo} alt="Logo de " />
                                    <span>X</span>
                                    <img src={require(`../../assets/images/games-logo/${team.current_videogame.slug}.png`)} alt="Logo de " />
                                    
                              </div>
                              <h1 className="team-name">{team.name}</h1>
                        </div>
                        
                  </div>

                  <div className="players-presentation">
                        <h1>Players</h1>
                        <div className="players-container">
                              {team.players.length == 0 ? <span>No data for this team</span> : ""}
                              {team.players.map(p=><PlayerCard key={p.id} name={p.name} firstname={p.first_name} lastname={p.last_name} age={p.age} img={p.image_url}/>)}
                        </div>
                  </div>
                  
            </div>
      )
}