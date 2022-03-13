import { useState } from "react"

function Login(props) {

    const [formData, setFormData] = useState({
        email: '', // required
        password: '' // required
    })
    
    const [error, setError] = useState({error:false, content:"This is an error!"});



    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3000/login', {
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
        .then(data => {
            localStorage.setItem("userId", data.user.id);
            props.setUserFunction(data.user)

            console.log(data.user)
        })
        .catch(function(e) {
            let message = e.split("");
            message.pop()
            message.shift()
            message = message.join("")
            setError({error:true, content:message})
        })
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <div className="login-container">
            <h1>Connexion</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <div className="form-element">
                    <label htmlFor="email">Adresse mail</label>
                    <input id="email" className="input-form" type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                </div>
                <div className="form-element">
                    <label htmlFor="password">Mot de passe</label>
                    <input id="password" className="input-form" type='text' placeholder='Mot de passe' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                </div>
                
                <button className='login-btn' type='submit'>Login</button>
                {error.error && <span className="error">{error.content}</span>}
            </form>
        </div>
    )
}

export default Login