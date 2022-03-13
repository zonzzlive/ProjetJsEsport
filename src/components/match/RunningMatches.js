import React, { useEffect, useState } from "react";
import { addDays, addHours } from "../../assets/helpers/date.js";
import MatchCard from "./MatchCard.js";

const ORIGIN = `https://api.pandascore.co/`;
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN


export default function RunningMatches(){
    const [matches, setMatches] = useState([])

    async function getRunningMatchesData(page, perPage){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${TOKEN}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        console.log(`${ORIGIN}matches/running?page=${page}&per_page=${perPage}`)

        fetch(`${ORIGIN}matches/running?page=${page}&per_page=${perPage}`, requestOptions)
            .then(response => response.json())
            .then(result => setMatches(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
            getRunningMatchesData(1,100)
    }, []);

    return (
        <div className="running-matches">
            <h1>Match en cours</h1>

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
    )
}