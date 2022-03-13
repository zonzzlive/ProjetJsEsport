import React, { useEffect, useState } from "react";
import { addDays, addHours } from "../../assets/helpers/date.js";
import MatchCard from "./MatchCard.js";

const ORIGIN = `https://api.pandascore.co/`;
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN


export default function PastMatches(){
    const [matches, setMatches] = useState([])

    async function getPastMatchesData(page, perPage){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${TOKEN}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        console.log(`${ORIGIN}matches/past?page=${page}&per_page=${perPage}`)

        fetch(`${ORIGIN}matches/past?page=${page}&per_page=${perPage}`, requestOptions)
            .then(response => response.json())
            .then(result => setMatches(result))
            .catch(error => console.log('error', error));
    }

    console.log(matches)
    useEffect(() => {
            getPastMatchesData(1,100)
    }, []);

    return (
        <div className="past-matches">
            <h1>Match terminés</h1>

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