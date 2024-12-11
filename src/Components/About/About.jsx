import {React, useState, useEffect} from 'react';
import "./About.scss";
import colosseo from './colosseo.png';
import sun from './sun.png';
import Radium, {StyleRoot} from 'radium';
import { slideInLeft, slideInRight, slideInUp, fadeIn } from 'react-animations';
import { Icon } from '@iconify/react';
import { Loading } from '../Loading/Loading';

const styles = {
  slideInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
  },
  slideInRight: {
    animation: 'x 3s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  },
  slideInUp: {
    animation: 'x 3s',
    animationName: Radium.keyframes(slideInUp, 'slideInUp')
  },
  fadeIn: {
    animation: 'x 3s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}

export default function About() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])
  return (
    <>
    {loading === false ? (
      
      
      <StyleRoot>
        <div className="container_about">
      <div className="rightpart">
        <div className="images"  style={styles.slideInLeft}></div>
        <div className="sun_div" style={styles.slideInUp}><img src={sun} className="sun"  /></div>
        <img src={colosseo} className="colosseo" style={styles.slideInRight} />
        
    
      </div>
      
      <div className="leftpart">
        <div className="information">
        <ul >Technologies used in developing this website
        <li><Icon icon="vscode-icons:file-type-reactjs" width="25" height="25" /> ReactJS</li>
        <li><Icon icon="logos:html-5" width="25" height="25" /> HTML</li>
        <li><Icon icon="logos:javascript" width="25" height="25" /> Javascript</li>
        <li><Icon icon="logos:sass" width="25" height="25" /> Sass</li>
        <li><Icon icon="logos:bootstrap" width="25" height="25" /> Bootstrap</li>
        <li></li>
        <li><p>All photos and backgrounds found on this website were shot by the site's owner.</p></li>
        <li><p>For contact info check the links in the site's footer.</p></li>
        </ul>
        
        
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
