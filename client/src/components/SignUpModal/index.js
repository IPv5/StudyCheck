import React, { Component } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';
import './style.css';
import SignUpForm from '../SignUpForm';

class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal14: props.toggle,
    };
  }

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>Sign Up</MDBModalHeader>
          <MDBModalBody>
            <SignUpForm />
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default SignUpModal;