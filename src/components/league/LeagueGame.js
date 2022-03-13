import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LeagueCard from "./LeagueCard";

const ORIGIN = `https://api.pandascore.co/`
const ORIGINDB = `${window.location.protocol}//${window.location.hostname}:3000`
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN

export default function LeagueGame(){
      
      let { slug } = useParams()
      const [leagues, setLeagues] = useState([])
      const [videogame, setVideogame] = useState([{image_url:"valorant.jpg"}])
      const [formData, setFormData] = useState("")

      //console.log(slug)
      //console.log(leagues)

      async function getLeagueBySlug(page, perPage, slug){

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
            };

            fetch(`${ORIGIN}videogames/${slug}/leagues`, requestOptions)
                  .then(response => response.json())
                  .then(result => setLeagues(result))
                  .catch(error => console.log('error', error));
      }

      async function getSearchedLeaguesData(page, perPage, slug){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
            };

            fetch(`${ORIGIN}videogames/${slug}/leagues?search[name]=${formData}&sort=&page=1&per_page=50`, requestOptions)
                  .then(response => response.json())
                  .then(result => setLeagues(result))
                  .catch(error => console.log('error', error));
      }

      async function getVideogame(slug){

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
            };

            fetch(`${ORIGINDB}/games?slug=${slug}`, requestOptions)
                  .then(response => response.json())
                  .then(result => setVideogame(result))
                  .catch(error => console.log('error', error));
      }

      function handleSubmit(e) {
            e.preventDefault()
            getSearchedLeaguesData()
      }

      function handleChange(e) {
            setFormData(e.target.value)
      }

      useEffect(() => {
            console.log(videogame[0])
            if(formData === ""){
                  getLeagueBySlug(1,100, slug);
                  getVideogame(slug);
            } else {
                  getSearchedLeaguesData(1, 100, slug);
                  getVideogame(slug);
            }
            
      }, [formData]);
      
      //console.log(videogame[0])
      //console.log(leagues)

      return (
            <div className="league-game">
                  <div className="league-herobanner">
                        <div className="league-background">
                              <img src={require(`../../assets/images/games/${videogame[0].image_url}`)} alt="Valorant"/>
                              <div className="overlay"></div>
                        </div>
                        <div className="league-logo">
                              <img src={require(`../../assets/images/games-logo/${slug}.png`)} alt="Valorant"/>
                              <h1 className="league-name">{videogame[0].name}</h1>
                        </div>
                  </div>
                  <div className="leagues">
                        <div className="header-leagues">
                              <h1 className="leagues-title">Les ligues de {videogame[0].name}</h1>
                              <form onSubmit={handleSubmit}>
                                    <input type="text" className="input-form" placeholder="Search" onChange={handleChange}/>
                              </form>
                        </div>
                        <div className="league-container">
                              {leagues.length !== 0 ? leagues.map(el=><LeagueCard key={el.id} slugLeague={el.slug} name={el.name} imageUrl={el.image_url} leagueGame={el.videogame.name}/>) : "loading"}                      
                        </div>
                  </div>
            </div>
      )
}