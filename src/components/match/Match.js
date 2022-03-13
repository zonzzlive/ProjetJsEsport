import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import TBDLogo from "../../assets/images/no-images/tbd.png"
import logo from "../../assets/images/logo.png"

const ORIGIN = `https://api.pandascore.co/`
const ORIGINDB = `${window.location.protocol}//${window.location.hostname}:3000`
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN




export default function Match(props){

    /**
     * TODOs:
        * [x] show title of the match
        * [x] show both team
        * [x] show bet btn + input field
        * [x] display with API Data
        * [x] make bet btn work
        * [x] make bet work (creation of a bet in db.json)
     * 
     */
    let { id } = useParams()
    const [match, setMatch] = useState({opponents:[], results:[]})
    const [formData, setFormData] = useState(
        {amount1: 0, amount2: 0}
    )
    const [bets, setBets] = useState([])

   
    console.log(match)

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
								
								//entourer une "variable" dans la créatiuon d'un objet permet
								// de définir cet objet comme la clé de l'objet.
            }
        })
    }

    function changeCoinOnUser(amount){
        props.setUserFunction(prevUser=>({
            ...prevUser,
            coins: prevUser.coins - amount
        }))

        var requestOptions = {
            method: 'PATCH',
            headers:{'content-type': 'application/json'},
            body: JSON.stringify({'coins':props.user.coins - amount})
        };

        fetch(`${ORIGINDB}/users/${props.user.id}`, requestOptions)
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(error => console.log('error', error))

        // console.log("usermon pote",props.user)

    }

    async function getMatchById(id){

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${TOKEN}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${ORIGIN}matches/${id}`, requestOptions)
            .then(response => {
                return response.json()})
            .then(result => setMatch(result))
            .catch(error => console.log('error', error));
    } 

    function getBetForAMatch(id){
        fetch(`${ORIGINDB}/bets?match_id=${id}`)
            .then(response => response.json())
            .then(result => setBets(result))
            .catch(error => console.log('error', error));
    }

    function handleClickBet(nb, team_id){
        if(localStorage.getItem('userId')==null || localStorage.getItem('userId')=="null"){
            console.log("no bet for you bro")
            return
        }

        if(nb===1){
            if(formData.amount1 > props.user.coins){
                console.log("trop pauvre")
                return
            }
            
        }else {
            if(formData.amount2 > props.user.coins){
                console.log("trop pauvre")
                return
            }
        }

        
        let bet = {
            user_id:props.user.id,
            match_id:match.id,
            amount: parseInt(nb===1?formData.amount1:formData.amount2),
            opponents:match.opponents,
            status:"not_finish",
            win: false,
            winner_id:team_id
        }


        var requestOptions = {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(bet)
        };

        fetch(`${ORIGINDB}/bets`, requestOptions)
            .catch(error => console.log('error', error))
        changeCoinOnUser(parseInt(nb===1?formData.amount1:formData.amount2))
    }

    // console.log(match)

    useEffect(() => {
        getMatchById(id)
        getBetForAMatch(id)
    }, [])
    


    return (
        <div className="unique-match-container">
            <h1>{match.name} [BO{match.number_of_games}]</h1>
            <h2>Il y a {bets.length} {bets.length <= 1 ? 'pari':"paris"} sur ce match</h2>
            <div className="unique-match-teams">
                
                
                <div className="team-one">
                    <div className="logo-team">
                        
                        <img src={match.opponents.length == 0 ? TBDLogo : (match.opponents[0].opponent.image_url == null ? logo : match.opponents[0].opponent.image_url) } alt="Logo" />
                    </div>
                    <h2 className="team-name">{match.opponents.length == 0 ? "TBD" : match.opponents[0].opponent.name }</h2>
                    <div className="bets-stats"></div>
                    {match.status =="not_started" ? <div className="match-bet">
                        <input 
                            type="number" 
                            className="input-amount" 
                            onChange={handleChange} 
                            name="amount1" 
                            max={props.user.coins}
                            disabled={match.opponents.length !== 2}
                            value={formData.amount1}
                            />
                        <button className="btn btn-bet-onmatch" onClick={()=>handleClickBet(1, match.opponents.length == 0 ? 0 : match.opponents[0].opponent.id)} disabled={match.opponents.length !== 2}>Miser</button>
                    </div> : <h2>{match.results.length != 0 ? match.results[0].score : 0}</h2> }
                   
                </div>
                
                <div className="team-two">
                    <div className="logo-team">
                        <img src={match.opponents.length <=1 ? TBDLogo : (match.opponents[1].opponent.image_url == null ? logo : match.opponents[1].opponent.image_url) } alt="Logo" />
                    </div>
                    <h2 className="team-name">{match.opponents.length <=1 ? "TBD" : match.opponents[1].opponent.name }</h2>
                    <div className="bets-stats"></div>
                    {match.status =="not_started" ? <div className="match-bet">
                        <input 
                            type="number" 
                            className="input-amount"
                            onChange={handleChange} 
                            name="amount2" 
                            max={props.user.coins}
                            disabled={match.opponents.length !== 2}
                            value={formData.amount2}
                            />
                        <button className="btn btn-bet-onmatch" onClick={()=>handleClickBet(2, match.opponents.length == 0 ? 0 : match.opponents[1].opponent.id)}  disabled={match.opponents.length !== 2}>Miser</button>
                    </div> : <h2>{match.results.length != 0 ? match.results[1].score : 0}</h2>}
                </div>
            </div>
            
        </div>
    )
}