import React, {useState} from "react";

import { addDays, addHours } from "../assets/helpers/date";
import UpcomingMatches from "./match/UpcomingMatches";
import PastMatches from "./match/PastMatches";
import RunningMatches from "./match/RunningMatches";

export default function Matches(){

      ///matches?range[begin_at]=2022-03-06T00:00:00,2022-03-06T23:59:59

      /**
       * 
       * TODO:
       * - get the current date ✅
       * - in order to get date for match✅
       *    - add 2 hours to the date --> first date ✅
       *    - add 5 days to the date + hours to 23:59:59 --> last date✅
       * - transform date into the good shape as : 2022-03-06T00:00:00✅
       */
      // let currDate = new Date();
      // let closeDate = new Date(addHours(currDate, 3))
      // let farDate = new Date(addDays(currDate, 5).setHours(23, 59, 59, 999));

      // console.log(currDate, closeDate.toISOString(), farDate.toISOString())

      const [displayingState, setDisplayingState] = useState("UPCOMING");

      function handleDisplayingChange(newState){
            setDisplayingState(newState)
      }

      

      return (
            <div className="matches">
                  <div className="match-choice">
                        <div className="match-btn">
                              <button className="btn btn-past" onClick={()=>handleDisplayingChange("PAST")}>Matchs passés</button>
                              <button className="btn btn-current" onClick={()=>handleDisplayingChange("RUNNING")}>Matchs en cours</button>
                              <button className="btn btn-upcoming" onClick={()=>handleDisplayingChange("UPCOMING")}>Matchs à venir</button>
                        </div>
                  </div>

                  {displayingState === "UPCOMING" ? <UpcomingMatches/> : ""}
                  {displayingState === "PAST" ? <PastMatches/> : ""}
                  {displayingState === "RUNNING" ? <RunningMatches /> : ""}

            </div>
      )
}