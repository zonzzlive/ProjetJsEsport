import Signup from "./Signup";
import Login from "./Login";

export default function Auth(props){
      return (
            <div className="user-form-container">
                  <Login setUserFunction={props.setUserFunction}/>
                  <div className="separator"></div>
                  <Signup />
            </div>
      )
}