import {React, useState,useEffect} from 'react'
import "./nfts.scss"
import { Icon } from '@iconify/react';
import Radium, {StyleRoot} from 'radium';
import { fadeIn } from 'react-animations';
import { Loading } from '../Loading/Loading';

const styles = {
 
    fadeIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },

    fadeInn: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
      }
  }

export const Nfts = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1250)
  }, [])
   

  return (
    <>
    {loading === false ? (
    <StyleRoot>
    <div className='header' style={styles.fadeIn}>

    <div className="card text-center" style={styles.fadeInn}>
        
  <div className="card-header">
    The Roman Shots NFT Collection
  </div>
  <div className="card-body">
    
    <p className="card-text">A collection of street shots and cityscapes of Rome.</p>
    <a href="https://opensea.io/collection/theromanshotscollection" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Check it out on Opensea.io</a>
  </div>
  
  <div className="card-footer text-muted">
    Floor Price: 0.014 <Icon icon="mdi:ethereum" color="#7F00FF" width="24" height="24" />
  </div>
</div>

<div className="card text-center" style={styles.fadeInn}>
        
  <div className="card-header">
   Coming Soon...
  </div>
  <div className="card-body">
    
    <p className="card-text">Coming Soon...</p>
    <a href="#"  className="btn btn-primary disabled" target="_blank" rel="noopener noreferrer">Coming Soon...</a>
  </div>
  
  <div className="card-footer text-muted">
    Floor Price: 0.0 <Icon icon="mdi:ethereum" color="#7F00FF" width="24" height="24" />
  </div>
</div>
    </div>
    </StyleRoot>
    
    ) : (
      <Loading />
    )}
    </>
  )
}
