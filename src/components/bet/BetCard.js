import React from "react";

import logo from "../../assets/images/logo.png"

export default function BetCard(props){

      //console.log(props)

      let winner_name = props.opponents.filter(el=> {
        console.log(el)  
        
        return el.opponent.id == props.winner_id})
      console.log(winner_name)

      return (
        <div className="bets-card">
            <div className="teams-bets">
                <div className="team">
                        <div className="team-logo">
                            <img src={props.opponents[0].opponent.image_url} alt="Logo" />
                        </div>
                        <span>{props.opponents[0].opponent.name}</span>
                </div>

                <div className="team">
                        <div className="team-logo">
                            <img src={props.opponents[1].opponent.image_url} alt="Logo" />
                        </div>
                        <span>{props.opponents[1].opponent.name}</span>
                </div>
            </div>
            <div className="bets-info">
                <span>Status : {props.status == "not_finish" ? "Non terminé" : "Terminé"}</span>
                <span>Montant : {props.amount} coins</span>
                <span>Vous avez parié sur : {winner_name[0].opponent.name}</span>
                {props.status == "finish"  ?( props.winned ? <span>Gagné</span> : <span>Perdu</span>) : ""}
            </div>
    </div>)
}