import React, { useState, useEffect} from "react";
import {
      Routes,
      Route,
    } from "react-router-dom";


import Header from "./components/Header";
import Home from "./components/Home";
import Matches from "./components/Matches";
import Match from "./components/match/Match.js"
import Bets from "./components/Bets";
import Teams from "./components/Teams";
import Team from "./components/team/Team"
import Ranking from "./components/Ranking";
import Games from "./components/Games";
import User from "./components/User"
import Leagues from "./components/Leagues"
import LeagueGame from "./components/league/LeagueGame";
import League from "./components/league/League";

const ORIGIN = `${window.location.protocol}//${window.location.hostname}:3000`;

export default function App(){
      const [user, setUser] = useState({id:null, avatar_url:null});
      console.log(user)

      useEffect(() => {

            async function getUserData(id){
                  const res = await fetch(`${ORIGIN}/users/${id}`)
                  const data = await res.json()
                  delete data.password;
                  setUser(data);
                  
            }

            

            
            if(localStorage.getItem("userId") != null && localStorage.getItem("userId") != "null"){
                  getUserData(localStorage.getItem("userId"))
            } else {
                  console.log('not logged in')
            }
            
      }, []);

      
      return (
            <div className="lnstat-app">
                  
                  <Header user={user} setUserFunction={setUser}/>
                  <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="matches" element={<Matches />} />
                        <Route path="matches/:id" element={<Match setUserFunction={setUser} user={user}/>}/>
                        <Route path="bets" element={<Bets setUserFunction={setUser} user={user}/>} />
                        <Route path="teams" element={<Teams />}/>
                        <Route path="teams/:slug" element={<Team />} />
                        <Route path="ranking" element={<Ranking />} />
                        <Route path="games" element={<Games />} />
                        <Route path="user" element={<User setUserFunction={setUser} user={user}/>} />
                        <Route path="leagues" element ={<Leagues />}/>
                        <Route path="leagues/:slug" element ={<LeagueGame />}/>
                        <Route path="league/:slug" element ={<League />}/>
                  </Routes>
            </div>
      )
}