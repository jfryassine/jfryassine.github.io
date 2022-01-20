import './App.scss';
import React from 'react';
import Gallery from "./Components/Gallery/Gallery"
import Footer from './Components/Footer/Footer'
import video from './vid.mp4'

function App() {
  return (
    <div className="app">
    
      <div class="vid">
        <video className="video" autoPlay loop muted src={video} onContextMenu="return false;"/>
          <div class="container text-center">
            <form action="#main" >
          <button type="submit" >VIEW PHOTOS</button>
           </form>
          </div>
      </div>
      <div className="main" id="main" >
        <Gallery/>
        <Footer/>
      </div>
    </div>
    
    
    
  );
}

export default App;
