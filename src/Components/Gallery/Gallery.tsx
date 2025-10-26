import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './gallery.scss';
import { galleryImages } from './images';

type GalleryState = {
  modalState: boolean;
  selectedimg: string | null;
};

type GalleryItem = {
  id: number;
  imgSrc: string;
};

export default class Gallery extends Component<unknown, GalleryState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      modalState: false,
      selectedimg: null
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState((prevState) => ({
      modalState: !prevState.modalState
    }));
  }

  render() {
    const data: GalleryItem[] = galleryImages.map((image, index) => ({
      id: index + 1,
      imgSrc: image
    }));

    return (
      <>
        <div className="gallery">
          <Modal isOpen={this.state.modalState} toggle={this.toggleModal} size="lg" contentClassName="custom-modal-style">
            <ModalHeader toggle={this.toggleModal} />
            <ModalBody style={{ textAlign: 'center' }}>
              {this.state.selectedimg ? <img className="imgmodal" src={this.state.selectedimg} alt="Gallery item" /> : null}
            </ModalBody>
          </Modal>
          {data.map((item) => (
            <div
              className="pics"
              key={item.id}
              onClick={() => {
                this.setState({
                  selectedimg: item.imgSrc
                });
                this.toggleModal();
              }}
            >
              <img
                src={item.imgSrc}
                alt="Gallery item"
                style={{ width: '100%' }}
                onContextMenu={(event) => {
                  event.preventDefault();
                }}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}
