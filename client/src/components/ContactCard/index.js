import React, { useState } from 'react';
import {
  toast,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBInput,
} from 'mdbreact';
import ContactAlert from '../ContactAlert';

// var helper = require('sendgrid').mail;
// var from_email = new helper.Email('admin@study-check.net');
// var to_email = new helper.Email('donationbuycraft@gmail.com');
// var subject = 'Hello World from the SendGrid Node.js Library!';
// var content = new helper.Content('text/plain', 'Hello, Email!');
// var mail = new helper.Mail(from_email, subject, to_email, content);



//Example from SendGrid for Node.js

// var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
// var request = sg.emptyRequest({
//   mode: 'no-cors',
//   method: 'POST',
//   path: '/v3/mail/send',
//   body: mail.toJSON(),
// });
const sgMail = require('@sendgrid/mail');



const ContactCard = () => {
  const [emailAlert, setEmailAlert] = useState(false);
  const [formInputs, setFormInputs] = useState({
    contactEmail: "",
    contactMessage: "",
    contactName: "",
    contactSubject: ""
  });

  // const msg = {
  //   to: 'donationbuycraft@gmail.com',
  //   from: 'admin@study-check.net',
  //   subject: 'Sending with Twilio SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // };


  // const sendEmail = async () => {
  //   await fetch(`http://localhost:3001/send-email?recipient=${msg.to}&sender=${msg.from}&topic=${msg.subject}&text=${msg.text}&html=${msg.html}`)
  //     .catch(err => console.log(err))
  // }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'donationbuycraft@gmail.com',
    from: 'admin@study-check.net',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };



  const onChange = e =>
    setFormInputs({ value: e.target.value });


  const handleEmailAlert = () => {
    setEmailAlert(true);
    toast.success('Message Received!', {
      closeButton: false,
    });
    setFormInputs({
      contactEmail: "",
      contactMessage: "",
      contactName: "",
      contactSubject: ""

    })
    // sg.API(request, function (error, response) {
    //   console.log(response.statusCode);
    //   console.log(response.body);
    //   console.log(response.headers);
    // });

    // sendEmail().then(result => { console.log(JSON.stringify(result)); });
    sgMail.send(msg);
  };

  return (
    <MDBContainer>
      <h3 className='h3-responsive text-center' id='contactUs'>
        Contact us
      </h3>
      <p className='text-center w-responsive mx-auto pb-5'>
        Comments? Questions? Concerns? We'd love to hear from you.
      </p>
      <MDBRow>
        <MDBCol md='9' className='md-0 mb-5'>
          <form id='contact-form'>
            <MDBRow>
              <MDBCol md='6'>
                <div className='md-form mb-0'>
                  <MDBInput
                    type='text'
                    id='contact-name'
                    label='Your name'
                    className='userInput'
                    value={formInputs.contactName}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </MDBCol>
              <MDBCol md='6'>
                <div className='md-form mb-0'>
                  <MDBInput
                    type='text'
                    id='contact-email'
                    label='Your email'
                    className='userInput'
                    value={formInputs.contactEmail}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='12'>
                <div className='md-form mb-0'>
                  <MDBInput
                    type='text'
                    id='contact-subject'
                    label='Subject'
                    className='userInput'
                    value={formInputs.contactSubject}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='12'>
                <div className='md-form mb-0'>
                  <MDBInput
                    type='textarea'
                    id='contact-message'
                    label='Your message'
                    className='userInput'
                    value={formInputs.contactMessage}
                  />
                </div>
              </MDBCol>
            </MDBRow>
          </form>
          <div className='text-center text-md-left'>
            <MDBBtn color='primary' size='md' onClick={handleEmailAlert}>
              Send
            </MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md='3' className='text-center'>
          <ul className='list-unstyled mb-0'>
            <li>
              <MDBIcon icon='map-marker-alt' size='2x' className='blue-text' />
              <p>Sacramento, CA, USA</p>
            </li>
            <li>
              <MDBIcon icon='phone' size='2x' className='blue-text mt-4' />
              <p>555-555-5555</p>
            </li>
            <li>
              <MDBIcon icon='envelope' size='2x' className='blue-text mt-4' />
              <p>info@studycheck.com</p>
            </li>
          </ul>
        </MDBCol>
      </MDBRow>
      {emailAlert && <ContactAlert />}
    </MDBContainer>
  );
};

export default ContactCard;
