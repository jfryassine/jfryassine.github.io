import React, { Component} from 'react'
import './gallery.scss'

export default class Gallery extends Component {

    
    render() {

        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => ( images[item.replace('./', '')] = r(item) ));
            return images;
          }

        const images = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg)$/)); 
        
        let data = [];
        for (let i = 1; i<=(Object.keys(images).length); i++){

            data[i]= { id:i, imgSrc:''+images['Img'+i+'.jpg']['default']+''}
            
        } 
        

        return (
            <>
            <div className="gallery">
                {
                    data.map((item, index)=>{
                        return(
                            <div className="pics" key={index}>
                                <img src={item.imgSrc} alt='' style={{width:'100%'}} onContextMenu="return false;" />
                                
                            </div>
                        )
                    })
                }
            </div>
            </>
        )
    }
}
