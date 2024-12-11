import React, { Component} from 'react'
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import './gallery.scss'

export default class Gallery extends Component {

    constructor(props){
        super(props);

        this.state={
          modalState : false,
          selectedimg: null

        }
        this.toggleModal = this.toggleModal.bind(this);
        
      }

      toggleModal() {
        this.setState({
            modalState : !this.state.modalState
        });
        }


    
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
            <Modal isOpen={this.state.modalState} 
                   toggle={this.toggleModal}
                   size="lg" 
                   contentClassName="custom-modal-style"
                >
                <ModalHeader isOpen={this.state.modalState} toggle={this.toggleModal}/>
                <ModalBody style={{textAlign: 'center'}}>
                 <img className='imgmodal' src={this.state.selectedimg}  />    
                
                </ModalBody>
            </Modal>
                {
                    data.map((item, index)=>{
                        return(
                            <div className="pics" key={index} onClick={ ()=>{
                                this.setState({
                                    selectedimg : item.imgSrc
                                });
                                this.toggleModal();
                            }
                            }>
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
