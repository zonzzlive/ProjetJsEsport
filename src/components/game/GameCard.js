import React from "react";
import { Link } from "react-router-dom"

export default function GameCard(props){

      return (
            <Link to={`/leagues/${props.slugGame}`} className="link">
                  <div className="game-card">
                        <div className="left">
                              <img src={require(`../../assets/images/games/${props.image_url}`)} alt="Valorant" />
                        </div>
                        <div className="right">
                              <h2 className="game-title">{props.name}</h2>
                              <p className="game-description">{props.description}</p>
                        </div>
                  </div>
            </Link>    
      )

}