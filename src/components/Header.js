import React from "react"
import { Link } from "react-router-dom";


import logo from '../assets/images/logo.png'
import userIcon from '../assets/images/icons/user.png'

export default function Header(props){
      function handleLogOut(){
            localStorage.setItem('userId', null)
            props.setUserFunction({id:null})
      }

      return (
            
            <header>
                  <ul>
                        <li >
                              <Link to="/">
                                    <img src={logo} alt="Logo de lnstat" className="lnstat-logo"/>
                              </Link>
                        </li>
                        <li>
                              <Link to="/matches" className="menu-link">Match</Link>
                        </li>
                        <li >
                              <Link className="menu-link" to="/bets">Paris</Link>
                        </li>
                        <li >
                              <Link className="menu-link" to="/teams">Équipe</Link>
                        </li>
                        <li >
                              <Link className="menu-link" to="/ranking">Classement</Link>
                        </li>
                        <li >
                              <Link className="menu-link" to="/games">Jeux</Link>
                        </li>
                        <li >
                              <Link className="menu-link" to="/leagues">Ligues</Link>
                        </li>
                  </ul>

                  <div>
                        {props.user.id == null ? "" : <button className="btn logout-btn" onClick={handleLogOut}>Deconnexion</button>}
                        <Link to="/user">
                              <img src={props.user.id == null ? userIcon : require(`../assets/images/avatar/${props.user.avatar_url}`)} alt="Icon user" className="icon user-icon"/>
                        </Link>
                  </div>
            </header>
      )
}