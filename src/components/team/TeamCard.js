import React from "react";
import { Link } from "react-router-dom"

import logo from "../../assets/images/logo.png"

export default function TeamCard(props){

      

      return (
            <Link to={`/teams/${props.slugTeam}`} className="link">
                  <div className="team-card">
                        <div>
                              <img src={props.imageUrl != null ? props.imageUrl : logo} alt={`Logo de ${props.name}`} />
                              <img src={require(`../../assets/images/games-logo/${props.game}.png`)} alt={`Logo ${props.game}`} className="logo-team-game"/>
                        </div>
                        <p className="team-name">{props.name}</p>
                  </div>
            </Link>
      )
}