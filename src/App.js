import {useState} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import ImageLinkForm from './components/image-link-form/image-link-form.component';
import Rank from './components/rank/rank.component';
import SignIn from './components/signin/signin.component';
import Particles from 'react-particles-js';
import Register from './components/register/register.component';
import FaceRecognition from './components/face-recognition/face-recognition.component';
import './App.css';


const app = new Clarifai.App({
  apiKey: '6dd75eb04a1b45d89954ef931509204e'
})


function App() {
  const[input, setInput] = useState('');
  const[imageUrl, setImageUrl] = useState('');
  const[box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({id: '', name: '', email: '', password: '', entries: 0, joined: ''});


  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    })
  }

  const calaculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input_image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box)
  }

  const onInputChange = (e) => (
    setInput(e.target.value)
  )

  const onSubmit = (e) => {
    setImageUrl(input)

  app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
  .then(response =>  { 
     if (response) {
       fetch('http://localhost:3000/image', {
         method: 'put',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
           id: user.id
         })
       })
       .then(response => response.json())
       .then(count => {
         setUser({...user, entries: count })
       })
     }
     displayFaceBox(calaculateFaceLocation(response))
  })
   .catch(err => console.log(err))
    
  }

  const onRouteChange = (route) => {
    if(route === 'signout') {
      setIsSignedIn(false)
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route)
  }


  return (
    
    <div className="">
       <Particles className='particles' 
                params={{
                  particles: {
                    number: {
                      value: 30,
                      density: {
                        enable: true,
                        value_area: 800
                      }
                    }
                  }
                }} />
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      { route === 'home' ? 

        <div>
       <Logo />
       <Rank name={user.name} entries={user.entries} email={user.email}/>
      <ImageLinkForm onInputChange={onInputChange} input={input} onSubmit={onSubmit}/>
      <FaceRecognition box={box} imageUrl={imageUrl}/>
      </div>
         :
        (
          route === 'signin' ?
          <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
          :
          <Register onRouteChange={onRouteChange}  loadUser={loadUser}/>
        )
      
       }
    </div>
  );
}

export default App;
