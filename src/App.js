import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import ImageLinkForm from './components/image-link-form/image-link-form.component';
import Rank from './components/rank/rank.component';
import Particles from 'react-particles-js';
import './App.css';

function App() {
  return (
    <div className="">
       <Particles 
                params={{
                    polygon: {
                        enable: true,
                        type: 'inside',
                        move: {
                            radius: 10
                        },
                        url: 'path/to/svg.svg'
                    }
                }} />
      <Navigation />
      <Logo />
       <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;
