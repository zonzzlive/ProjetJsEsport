import React from "react";

import { Link } from "react-router-dom";

import { turnTwoDigits } from "../../assets/helpers/date"

import TBDLogo from "../../assets/images/no-images/tbd.png"
import logo from "../../assets/images/logo.png"

export default function MatchCard(props){

    let date = new Date(props.date);
    let hourGame = `${turnTwoDigits(date.getHours())}h${turnTwoDigits(date.getMinutes())}`
    let dateGame = `${turnTwoDigits(date.getDate())}/${turnTwoDigits(date.getMonth() + 1)}`

    let jsxTeamImages = (
        
        props.opponents.length == 0 ? (
        <div className="team-logo-match">
            <div>
                <img src={TBDLogo}/>
            </div>
            <div>
                <img src={TBDLogo}/>
            </div>
        </div>) : props.opponents.length == 1 ? (
        <div className="team-logo-match">
            <div>
                <img src={props.opponents[0].opponent.image_url == null ? logo : props.opponents[0].opponent.image_url}/>
            </div>
            <div>
                <img src={TBDLogo}/>  
            </div>
        </div>) : (
        <div className="team-logo-match">
            <div>
                <img src={props.opponents[0].opponent.image_url == null ? logo : props.opponents[0].opponent.image_url}/>
            </div>
            <div>
                <img src={props.opponents[1].opponent.image_url == null ? logo : props.opponents[1].opponent.image_url}/>
            </div>
        </div>)

    )

    

    const jsxTeamNames = (
        props.opponents.length == 0 ? (
        <div className="team-name-match">
            <span>TBD</span>
            <span>TBD</span>
        </div>) : props.opponents.length == 1 ? (
        <div className="team-name-match">
            <span>{props.opponents[0].opponent.name}</span>
            <span>TBD</span>
        </div>) : (
        <div className="team-name-match">
            <span>{props.opponents[0].opponent.name}</span>
            <span>{props.opponents[1].opponent.name}</span>
        </div>)
    )
    return (
        <div className="match-card">
            <div className="left">
                    <span className="match-hour">{hourGame}</span>
                    <span className="match-date">{dateGame}</span>
            </div>
            <div className="separator"></div>
            <div className="center">
                    
                    {jsxTeamImages}

                    {jsxTeamNames}
            </div>
            <div className="separator"></div>
            <div className="right">
                    <Link to={`/matches/${props.id}`} className="btn btn-bet">
                        En voir plus
                    </Link>
                    
            </div>
        </div>
    )
}