import React, {useState, useEffect} from "react";

import Auth from "./auth/Auth";



export default function User(props){
      console.log(props.user);
      
      let jsx = (
            props.user.id != null ?(
            <div className="user-container">
                  <div className="user-infos">
                        <img src={require(`../assets/images/avatar/${props.user.avatar_url}`)} alt="Avatar" className="user-avatar"/>
                        <div className="user-name">
                              <h1>{props.user.username}</h1>
                              {/* <span>{props.user.firstname} {props.user.lastname}</span> */}
                              <h3>Tu as {props.user.coins} coins !</h3>
                        </div>
                  </div>
                  

                  {/* <div className="user-bets">
                        <h1>Tes paris :</h1>
                  </div> */}
                  
            </div>) : <Auth setUserFunction={props.setUserFunction}/>
            
      )


      return (
            <div className="user">
                  {jsx}
            </div>
      )
}