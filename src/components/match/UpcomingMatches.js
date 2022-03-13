import React, { useEffect, useState } from "react";
import { addDays, addHours } from "../../assets/helpers/date.js";
import MatchCard from "./MatchCard.js";

const ORIGIN = `https://api.pandascore.co/`;
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN

export default function UpcomingMatches(){

    const [matches, setMatches] = useState([])

    let currDate = new Date().toISOString()
    let farDate = new Date(addDays(currDate, 90).setHours(23, 59, 59, 999)).toISOString()

    async function getFutureMatchesData(page, perPage, currDate, farDate){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${TOKEN}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(`${ORIGIN}matches?range[begin_at]=${currDate},${farDate}&rangepage=${page}&per_page=${perPage}`)

        fetch(`${ORIGIN}matches?range[begin_at]=${currDate},${farDate}&rangepage=${page}&per_page=${perPage}`, requestOptions)
            .then(response => response.json())
            .then(result => setMatches(result))
            .catch(error => console.log('error', error));
    }

    console.log(matches)
    useEffect(() => {
            getFutureMatchesData(1,100, currDate, farDate)
    }, []);

    console.log(currDate, farDate)

    return (
        <div className="upcoming-matches">
            <h1>Match à venir</h1>

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