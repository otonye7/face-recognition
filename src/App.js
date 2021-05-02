import {useState} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import ImageLinkForm from './components/image-link-form/image-link-form.component';
import Rank from './components/rank/rank.component';
import Particles from 'react-particles-js';
import FaceRecognition from './components/face-recognition/face-recognition.component';
import './App.css';


const app = new Clarifai.App({
  apiKey: '6dd75eb04a1b45d89954ef931509204e'
})

function App() {
  const[input, setInput] = useState('');
  const[imageUrl, setImageUrl] = useState('');

  const onInputChange = (e) => (
    setInput(e.target.value)
  )

  const onSubmit = (e) => {
    setImageUrl(input)

  app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
   function(response) {
     console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
  },
    function(err) {

   }
  )
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
      <Navigation />
      <Logo />
       <Rank />
      <ImageLinkForm onInputChange={onInputChange} input={input} onSubmit={onSubmit}/>
      <FaceRecognition imageUrl={imageUrl}/>
    </div>
  );
}

export default App;
