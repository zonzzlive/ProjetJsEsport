import React, {useState, useEffect} from "react";

import BetCard from "./bet/BetCard";

const ORIGIN = `https://api.pandascore.co/`
const ORIGINDB = `${window.location.protocol}//${window.location.hostname}:3000`
const TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN

export default function Bets(props){
      console.log("user", props.user)

      var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };

      const [bets, setBets] = useState([])

      

      const toCheckBet = groupBy(bets.filter(el=>el.status === "not_finish"), "match_id");
      console.log("check",toCheckBet)

      Object.keys(toCheckBet).forEach(key => {
            checkBetsByMatch(key, toCheckBet[key]);
      });

      const jsxNotConnected = (
            <div className="notconnected">
                  <h2>Vous n'êtes pas connecté, connectez vous pour voir vos paris</h2>
                  <a href="/user" className="btn btn-redirect">Se connecter</a>
            </div>
      )

      function changeCoinOnUser(amount){
            // props.setUserFunction(prevUser=>({
            //       ...prevUser,
            //       coins: prevUser.coins + amount
            // }))

            var requestOptions = {
                  method: 'PATCH',
                  headers:{'content-type': 'application/json'},
                  body: JSON.stringify({'coins':props.user.coins + amount})
            };

            fetch(`${ORIGINDB}/users/${props.user.id}`, requestOptions)
                  .then(res=>res.json())
                  .then(data=>console.log(data))
                  .catch(error => console.log('error', error))

            // console.log("usermon pote",props.user)
      }


      async function checkBetsByMatch(matchId, bets){
            let match = await getMatchById(matchId)
            if(match.status == "finished"){
                  //keep going
                  console.log(match);
                  bets.map(el=>{
                        if(match.winner_id == el.winner_id){
                              console.log("c'est gagné!")
                              //update bet
                              modifyBet(el.id, true)
                              //update user
                              /**
                               * give user double of amount
                               * 
                               */
                              changeCoinOnUser(el.amount * 2)
                        } else {
                              console.log("c'est perdu :(")
                              //update bet
                              modifyBet(el.id, false)
                              
                        }
                        
                  })
            }  
      }

      async function modifyBet(betId, winned){

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let body = {
                  "status":"finish",
                  "win":winned
            }




            var requestOptions = {
                  method: 'PATCH',
                  headers: myHeaders,
                  body: JSON.stringify(body),
                  redirect: 'follow'
            }

            fetch(`${ORIGINDB}/bets/${betId}`, requestOptions)
                  .then(response => response.json())
                  .then(result => console.log(result))


      }

      async function getMatchById(matchId){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
            };

            const response = await fetch(`${ORIGIN}matches/${matchId}`, requestOptions)

            if (response.status == 200) {
                  return response.json();
                  //console.log( await response.json())
            } else {
                  console.log("error");
            }
      }

      async function getBetsOfPlayer(id){  
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cache-Control", "no-cache, no-store, must-revalidate")
            myHeaders.append("Pragma", "no-cache")
            myHeaders.append("Expires", 0)
            
            var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
                };

            fetch(`${ORIGINDB}/bets?user_id=${id}`, requestOptions)
                  .then(response => response.json())
                  .then(result => setBets(result))
                  .catch(error => console.log('error', error));
      }


      useEffect(() => {
            let idUser = localStorage.getItem("userId");
            console.log("id:", idUser)
            getBetsOfPlayer(idUser)
      }, [])

      const jsx = bets.map(el=><BetCard key={el.id} opponents={el.opponents} status={el.status} winned={el.win} amount={el.amount} winner_id={el.winner_id}/>)
      




      return (
            <div className="bets">
                  {props.user.id == null ? jsxNotConnected : (bets.length == 0 ? <h1>Vous n'avez pas encore de pari ! Foncez !</h1>: <div className="bets-container">{jsx}</div>)}
            </div>
      )
}