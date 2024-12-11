import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import {React, useState, useEffect, useRef} from 'react';
import Gallery from "./Components/Gallery/Gallery";
import Footer from './Components/Footer/Footer';
import {Info,ExpandMore} from '@material-ui/icons';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import { init } from 'ityped';
import About from './Components/About/About';
import Radium, {StyleRoot} from 'radium';
import { fadeIn } from 'react-animations';
import nftbg from './assets/spietro.png';
import colosseoimg from './Components/About/colosseo.png';
import sunimg from './Components/About/sun.png';



const styles = {
 
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }

  
}

function App() {

  const [modalState, setModalState] = useState(false);
  const [currentPage, setCurrentPage] = useState('main');
  const [currentText, setCurrentText] = useState('');

  const textRef = useRef();
    
    useEffect(() => {
      const img = new Image();
      img.src = nftbg;
      img.src = colosseoimg;
      img.src = sunimg;
        init(textRef.current, {
            
            backDelay: 1500,
            backSpeed: 60,
            showCursor: true,
            strings: [`TO CHECK THE PHOTOS`] });

            
        },[])



  
    function toggleModal() {
      setModalState(!modalState);
    }

    const mainBody = () =>{
      if(currentPage == "main")
        return(
          <>
          <StyleRoot>
          <div className="vid " style={styles.fadeIn}>
         <div className="video" >
           
          <div className="container">
          
            <span ref={textRef} className='text1' >{currentText}</span>
            <p className='text2' >PROCEED TO THE GALLERY</p>
            <a onClick={() => document.querySelector('.main').scrollIntoView({ behavior: 'smooth' })}  rel='noopener noreferrer' className='proceed'><ExpandMore style={{ fontSize: 40 , color: 'white' ,cursor:'pointer' }} /></a>
          </div>
          </div>
          <Info className="info" fontSize='large' 
        style={currentPage=='main' ? {color:'white',cursor:'pointer'} : {color: '#4dc7ff',cursor:'pointer'}}
        onClick={event => {event.preventDefault(); toggleModal()}}/>
      </div>
      </StyleRoot>
      <div className="main" id="main" >
        <Gallery/>
      </div>
      </>);
      
      else if(currentPage == "about"){
        return(<>
        <About/>
        </>)
      }

    }

    
   
  return (
    
    
    <div className="app">
      <div className='modal'>
          <Modal isOpen={modalState} toggle={toggleModal}>
        <ModalHeader isOpen={modalState} toggle={toggleModal}>
          Notice
        </ModalHeader>
        <ModalBody>
        This website and all photographs are © Copyright 2019-2022 Jaafar Yassine. All Rights Reserved.
        <br/>
        The use of any of the photographs on this website without the written permission of the photographer is strictly prohibited and violations will be pursued to the furthest extent allowed under the law.
        <br/>You may obtain permission to use images from this website by contacting me at jaafaryassine.27@gmail.com, or through the social media channels available at the end of the site.
          
        </ModalBody>
      </Modal>
          </div>
          <div className="topbar">
        <div className="left">
        <a className='logo' ><h2 onClick={()=>setCurrentPage('main')} style={currentPage=='main' || currentPage=='nfts' ? {color:'white', fontWeight:'bold'} : {color: 'black', fontWeight:'bold'} }>jy.</h2></a>
          </div>
          
        <div className="right">

        

          
        <a  className="aboutlink" ><h4 onClick={()=> {
          setCurrentPage('about');
          setCurrentText(`TO CHECK THE PHOTOS`);
          } }
          style={currentPage=='main' || currentPage=='nfts' ? {color:'white', fontWeight:'bold'} : {color: 'black',  fontWeight:'bold'}}>About</h4></a>

        
        
        </div>
        </div>
        
        {mainBody()}
      
      
     
      <Footer/>
    </div>
 
  );
}

export default App;
