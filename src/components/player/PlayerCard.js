import React from "react";

export default function PlayerCard(props){
      return (
            <div className="player-card">
                  <div className="player-image">
                        <img src={props.img == null ? require(`../../assets/images/no-images/player.png`): props.img} alt={`${props.name}`} />
                  </div>
                  <div className="player-info">
                        <h2>{props.name}</h2>
                        {props.firstname ==null ? "" : <span>{props.firstname} {props.lastname}</span>}
                        {props.age ==null ?"" : <span>{props.age} ans</span>}
                        
                  </div>
            </div>
      )
}