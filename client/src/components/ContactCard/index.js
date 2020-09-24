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




const ContactCard = () => {
  const [emailAlert, setEmailAlert] = useState(false);
  const [formInputs, setFormInputs] = useState({
    contactEmail: "",
    contactMessage: "",
    contactName: "",
    contactSubject: ""
  });


  const sendContactEmail = async () => {
    await fetch(`https://studycheck.herokuapp.com/send-contact-email?recipient=${msg.to}&sender=${msg.from}&topic=${msg.subject}&text=${msg.text}&name=${contactName}`)
      .catch(err => console.log(err))
  }

  const sendContactEmailToAdmins = async () => {
    await fetch(`https://studycheck.herokuapp.com/send-contact-email-to-admins?recipient=${adminMsg.to}&sender=${adminMsg.from}&topic=${adminMsg.subject}&text=${adminMsg.text}&name=${contactName}`)
      .catch(err => console.log(err))
  }


  const { contactEmail, contactMessage, contactName, contactSubject } = formInputs;
  const onChange = (e) => setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const msg = {
    to: "donationbuycraft@gmail.com",
    from: 'admin@study-check.net',
    subject: contactSubject,
    text: contactName,
    name: contactName
  };

  const adminMsg = {
    to: 'admin@study-check.net',
    from: 'admin@study-check.net',
    subject: contactSubject,
    text: `${contactMessage} From: ${contactName} Email: ${contactEmail}`,
    name: contactName
  };

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

    sendContactEmail();
    sendContactEmailToAdmins();
    // sgMail.send(msg);
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
                    name="contactName"
                    value={contactName}
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
                    name="contactEmail"
                    value={contactEmail}
                    onChange={(e) => onChange(e)}
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
                    name="contactSubject"
                    value={contactSubject}
                    onChange={(e) => onChange(e)}
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
                    name="contactMessage"
                    value={contactMessage}
                    onChange={(e) => onChange(e)}
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
