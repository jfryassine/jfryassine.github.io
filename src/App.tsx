import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Gallery from './Components/Gallery/Gallery';
import Footer from './Components/Footer/Footer';
import { Info, ExpandMore } from '@material-ui/icons';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { init } from 'ityped';
import About from './Components/About/About';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations';
import nftbg from './assets/spietro.png';
import colosseoimg from './Components/About/colosseo.png';
import sunimg from './Components/About/sun.png';

const styles = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
};

const App: React.FC = () => {
  const [modalState, setModalState] = useState(false);
  const [currentPage, setCurrentPage] = useState<'main' | 'about'>('main');
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const imageSources = [nftbg, colosseoimg, sunimg];
    imageSources.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    if (textRef.current) {
      init(textRef.current, {
        backDelay: 1500,
        backSpeed: 60,
        showCursor: true,
        strings: ['TO CHECK THE PHOTOS']
      });
    }
  }, []);

  const toggleModal = () => {
    setModalState((prev) => !prev);
  };

  const handleScrollToGallery = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const mainSection = document.querySelector('.main');
    if (mainSection instanceof HTMLElement) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mainBody = () => {
    if (currentPage === 'main') {
      return (
        <>
          <StyleRoot>
            <div className="vid" style={styles.fadeIn}>
              <div className="video">
                <div className="container">
                  <span ref={textRef} className="text1" />
                  <p className="text2">PROCEED TO THE GALLERY</p>
                  <a
                    className="proceed"
                    href="#main"
                    onClick={handleScrollToGallery}
                    rel="noopener noreferrer"
                  >
                    <ExpandMore style={{ fontSize: 40, color: 'white', cursor: 'pointer' }} />
                  </a>
                </div>
              </div>
              <Info
                className="info"
                fontSize="large"
                style={
                  currentPage === 'main'
                    ? { color: 'white', cursor: 'pointer' }
                    : { color: '#4dc7ff', cursor: 'pointer' }
                }
                onClick={(event) => {
                  event.preventDefault();
                  toggleModal();
                }}
              />
            </div>
          </StyleRoot>
          <div className="main" id="main">
            <Gallery />
          </div>
        </>
      );
    }

    if (currentPage === 'about') {
      return <About />;
    }

    return null;
  };

  return (
    <div className="app">
      <div className="modal">
        <Modal isOpen={modalState} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Notice</ModalHeader>
          <ModalBody>
            This website and all photographs are © Copyright 2019-2022 Jaafar Yassine. All Rights
            Reserved.
            <br />
            The use of any of the photographs on this website without the written permission of the
            photographer is strictly prohibited and violations will be pursued to the furthest extent
            allowed under the law.
            <br />You may obtain permission to use images from this website by contacting me at
            jaafaryassine.27@gmail.com, or through the social media channels available at the end of the
            site.
          </ModalBody>
        </Modal>
      </div>
      <div className="topbar">
        <div className="left">
          <a className="logo" href="#top">
            <h2
              onClick={() => setCurrentPage('main')}
              style={
                currentPage === 'main' ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' }
              }
            >
              jy.
            </h2>
          </a>
        </div>
        <div className="right">
          <a className="aboutlink" href="#about">
            <h4
              onClick={() => {
                setCurrentPage('about');
              }}
              style={
                currentPage === 'main'
                  ? { color: 'white', fontWeight: 'bold' }
                  : { color: 'black', fontWeight: 'bold' }
              }
            >
              About
            </h4>
          </a>
        </div>
      </div>
      {mainBody()}
      <Footer />
    </div>
  );
};

export default App;
