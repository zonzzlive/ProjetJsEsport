import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';


function Signup() {
    const [formData, setFormData] = useState({
        id:uuidv4(),
        email: '', // required
        password: '', // required
        username: '', // optional
        coins:100,
        avatar_url:"vitality.jpg"
    })
    const [error, setError] = useState({error:false, content:"This is an error!"});

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw text })
            }
            else {
               return res.json();
            }
        })
        .then(data => console.log(data.user))
        .catch(function(e) {
            let message = e.split("");
            message.pop()
            message.shift()
            message = message.join("")
            setError({error:true, content:message})
        })
    }

    function handleChange(e) {
        setError(prevCurr => ({...prevCurr, error:false}))
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <div className="signup-container">
            <h1>Inscription</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <div className="form-element">
                    <label htmlFor="username-s">Nom d'utilisateur</label>
                    <input className="input-form" id="username-s" type='text' placeholder="Nom d'utilisateur" value={formData.username} name='username' onChange={e => handleChange(e)} ></input>
                </div>
                <div className="form-element">
                    <label htmlFor="mail-s">Adresse mail</label>
                    <input className="input-form" id="mail-s" type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                </div>
                <div className="form-element">
                    <label htmlFor="password-s">Mot de passe</label>
                    <input className="input-form" id="password-s" type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                </div>
                <button className='login-btn' type='submit'>Sign Up</button>
                {error.error && <span className="error">{error.content}</span>}
            </form>
        </div>
    )
}

export default Signup