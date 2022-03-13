import React , {useState, useEffect} from "react";
import LeagueCard from "./league/LeagueCard";

const ORIGIN = `https://api.pandascore.co/`;
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN

export default function Leagues(){

      const [leagues, setLeagues] = useState([]);
      const [formData, setFormData] = useState("")
      const [error, setError] = useState({error:false, content:"This is an error!"});

      async function getSearchedLeaguesData(page, perPage){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
            };

            fetch(`${ORIGIN}leagues?search[name]=${formData}&sort=&page=1&per_page=50`, requestOptions)
                  .then(response => response.json())
                  .then(result => setLeagues(result))
                  .catch(error => console.log('error', error));
      }

      async function getLeaguesData(page, perPage){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
            };

            fetch(`${ORIGIN}leagues?sort=id&page=${page}&per_page=${perPage}`, requestOptions)
                  .then(response => response.json())
                  .then(result => setLeagues(result))
                  .catch(error => console.log('error', error));

            /*fetch(`${ORIGIN}leagues?search[videogame.name]=LoL`, requestOptions)
                  .then(response => response.json())
                  .then(result => setLeagues(result))
                  .catch(error => console.log('error', error));*/
      }
      
      function handleSubmit(e) {
            e.preventDefault()
            getSearchedLeaguesData()
      }

      function handleChange(e) {
            setFormData(e.target.value)
      }

      useEffect(() => {

            if(formData === ""){
                  getLeaguesData(1,100);
            } else {
                  getSearchedLeaguesData()
            }
            
      }, [formData]);

      return (
            <div className="leagues">
                  <div className="header-leagues">
                        <h1 className="leagues-title">Les ligues</h1>
                        <form onSubmit={handleSubmit}>
                              <input type="text" className="input-form" placeholder="Search" onChange={handleChange}/>
                              
                        </form>
                  </div>
                  
                  <div className="league-container">
                        {leagues.length !== 0 ? leagues.map(el=><LeagueCard key={el.id} slugLeague={el.slug} name={el.name} imageUrl={el.image_url} leagueGame={el.videogame.name}/>) : (formData != "" ? "Pas de données" : "Loading")}
                        
                  </div>
                  
            </div>
      )
}