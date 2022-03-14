import React , {useState, useEffect} from "react";
import TeamCard from "./team/TeamCard";

import iconSearch from "../assets/images/icons/search.png"

const ORIGIN = `https://api.pandascore.co/`;
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN


export default function Teams(){

      const [teams, setTeams] = useState([]);
      const [formData, setFormData] = useState("")
      const [error, setError] = useState({error:false, content:"This is an error!"});
      const [total, setTotal] = useState(0)
      const [page, setPage] = useState(1)

      console.log("nbPage",Math.ceil(total/100))

      async function getSearchedTeamsData(page, perPage){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
            };

            fetch(`${ORIGIN}teams?search[name]=${formData}&sort=&page=1&per_page=50`, requestOptions)
                  .then(response =>response.json() )
                  .then(result => setTeams(result))
                  .catch(error => console.log('error', error));
      }

      async function getTeamsData(page, perPage){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
            };

            fetch(`${ORIGIN}teams?sort=id&page=${page}&per_page=${perPage}`, requestOptions)
                  .then(response =>{
                        setTotal(parseInt(response.headers.get("X-Total")))
                        return response.json()
                  } )
                  .then(result => setTeams(result))
                  .catch(error => console.log('error', error));
      }
      
      function handleSubmit(e) {
            e.preventDefault()
            getSearchedTeamsData()
      }

      function handleChange(e) {
            setFormData(e.target.value)
      }

      console.log(teams)

      useEffect(() => {

            if(formData === ""){
                  getTeamsData(page,100);
            } else {
                  getSearchedTeamsData()
            }
            
      }, [formData, page]);

      return (
            <div className="teams">
                  <div className="header-teams">
                        <h1 className="teams-title">Les équipes</h1>
                        <form onSubmit={handleSubmit}>
                              <input type="text" className="input-form" placeholder="Search" onChange={handleChange}/>
                              
                        </form>
                  </div>
                  
                  <div className="team-container">
                        {teams.length !== 0 ? teams.map(el=><TeamCard key={el.id} game={el.current_videogame.slug} slugTeam={el.slug} name={el.name} imageUrl={el.image_url}/>) : (formData != "" ? "Pas de données" : "Loading")}
                       
                  </div>
                  
            </div>
      )
}