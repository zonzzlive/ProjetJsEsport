import React from "react";
import bg from "../assets/images/background/bg-main.png"

export default function Home(){
      return (
            <div className="home">
                  <div className="header-home">
                        <div className="right">
                              <h1>Pariez et suivez l'actualité <br></br> de vos jeux préférés </h1>
                        </div>
                        <div className="left">
                              <img src={bg} alt="Logo de lnstat" className=""/>
                        </div>
                  </div>
            </div>


      )
}