import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MatchCard from "../match/MatchCard";

const ORIGIN = `https://api.pandascore.co/`;
const ORIGINDB = `${window.location.protocol}//${window.location.hostname}:3000`
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN

export default function League(){
      
    let { slug } = useParams();
    const [league, setLeague] = useState({
        videogame: {
            slug:"valorant"
        },
            
    });
    const [matches, setMatches] = useState([])

    async function getLeagueBySlug(slug){

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${TOKEN}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${ORIGIN}leagues/${slug}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLeague(result)
                // getVideogame(league.current_videogame.slug)
            })
            .catch(error => console.log('error', error));
      }
      
    async function getMatchByLeague(slug){

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${TOKEN}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${ORIGIN}/leagues/${slug}/matches`, requestOptions)
            .then(response => response.json())
            .then(result => setMatches(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getLeagueBySlug(slug)
        getMatchByLeague(slug)
        // getVideogame(league.current_videogame.slug)
    }, []);
      
    console.log(league)
    
    /*console.log(videogame[0])
    console.log(slug)
    console.log(league)*/

      return (
            <div className="league-unique">
                  <div className="league-herobanner">
                        <div className="league-background">
                        <img src={require(`../../assets/images/games/${league.videogame.slug}.jpg`)} alt="Valorant"/>
                            <div className="overlay"></div>
                        </div>
                        <div className="league-infos">
                            <div className="league-logo">
                                    <img src={require(`../../assets/images/games-logo/${league.videogame.slug}.png`)} alt={league.videogame.name + "Logo"}/>
                                    <span>X</span>
                                    <img src={league.image_url} alt={league.name + "Logo"}/>
                                    
                            </div>
                            
                        </div>
                        <div className="league-matches-container">
                            <h1 className="league-name">{league.name}</h1>
                            <div className="matches-container">
                                {
                                    matches.map(el=>(
                                        <MatchCard  key={el.id} 
                                        id={el.id}
                                        opponents={el.opponents}
                                        date={el.begin_at}
                                        videogame={el.videogame}/>))       
                                }
                            </div>
                        </div>
                       
                        
                  </div>
                  
            </div>
      )
}