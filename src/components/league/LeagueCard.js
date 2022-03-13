import React from "react";
import { Link } from "react-router-dom"

import logo from "../../assets/images/logo.png"

export default function LeagueCard(props){

      //console.log(props)

      return (
            <Link to={`/league/${props.slugLeague}`} className="link">
                  <div className="league-card">
                        <div>
                              <img src={props.imageUrl != null ? props.imageUrl : logo} alt={`Logo de ${props.name}`} />
                        </div>
                        <p className="league-name">{props.name}</p>
                  </div>
            </Link>
      )
}