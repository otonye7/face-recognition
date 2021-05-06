import {useState} from 'react';

const SignIn = ({onRouteChange}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChanged = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChanged = (e) => {
    setPassword(e.target.value)
  }

  const onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data === 'success') {
         onRouteChange('home')
      }
    })
   
  }

return (

<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="email"
        name="email-address"
        id="email-address"
        onChange={onEmailChanged}
         />
      </div>
      <div class="mv3">
        <label className="db fw6 lh-copy f6" for="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="password" 
        name="password"
        id="password" 
        onChange={onPasswordChanged}
        />
      </div>
    </ fieldset >
    <div class="">
      <input 
      onClick={onSubmitSignIn}
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
      type="submit"
      value="Sign in" 
      />
    </div>
    <div class="lh-copy mt3">
      <p   onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
    </div>
  </div>
</ main >
</article>
      
    )
}

export default SignIn;