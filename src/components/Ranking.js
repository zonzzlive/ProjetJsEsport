import React, {useState, useEffect} from "react";

const ORIGIN = `${window.location.protocol}//${window.location.hostname}:3000`;

export default function Ranking(){
      const [users, setUsers] = useState([]);

      async function getUserData(){
            const res = await fetch(`${ORIGIN}/users?_start=0&_end=100&_sort=coins&_order=desc&password_ne=1`)
            const data = await res.json()
            setUsers(data);
      }
      console.log(users);

      useEffect(() => {
            getUserData();

      }, []);


      let jsx = (
            <div className="ranking-container">
                        <div className="ranking-top3">
                              {users.length < 1 ? "No data..." : (
                              <div className="card-rank-t gold">
                                    <h2>1</h2>
                                    <img src={require(`../assets/images/avatar/${users[0].avatar_url}`)} alt="Avatar" className="icon user-icon"/>
                                    <h1>{users[0].username}</h1>
                                    <h2>{users[0].coins}</h2>
                              </div>)
                              }

                              {users.length < 2 ? "No data..." : (
                              <div className="card-rank-t silver">
                                    <h2>2</h2>
                                    <img src={require(`../assets/images/avatar/${users[1].avatar_url}`)} alt="Avatar" className="icon user-icon"/>
                                    <h1>{users[1].username}</h1>
                                    <h2>{users[1].coins}</h2>
                              </div>)
                              }

                              {users.length < 3 ? "No data..." : (
                              <div className="card-rank-t card-rank-t bronze">
                                    <h2>3</h2>
                                    <img src={require(`../assets/images/avatar/${users[2].avatar_url}`)} alt="Avatar" className="icon user-icon"/>
                                    <h1>{users[2].username}</h1>
                                    <h2>{users[2].coins}</h2>
                              </div>)
                              }
                        </div>
                        
                        <div className="ranking-places">
                              {users.length <= 3 ? "Loading" : users.map((el, i)=>{
                                    if(i >= 3){
                                          console.log(el)
                                          return (
                                                <div className="card-rank" key={el.id}>
                                                      <h2>{i+1}</h2>
                                                      <img src={require(`../assets/images/avatar/${el.avatar_url}`)} alt="Avatar" className="icon user-icon"/>
                                                      <h1>{el.username}</h1>
                                                      <h2>{el.coins}</h2>
                                                </div>)
                                    }
                                    
                              })}
                        </div>
                  </div>
      )


      return (
            <div className="ranking">
                  <h1 className="ranking-title">Le classement</h1>
                  
                  {jsx}
                  
                  
            </div>
      )
}