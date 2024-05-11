import axios from 'axios';
import React, { useState } from 'react'

function Contact() {
    
    const [name, Setname] = useState("");
    const [email, Setemail] = useState("");
    const [mobile, Setmobile] = useState("");
    const [subject, Setsubject] = useState("");
    const [message, Setmessage] = useState("");


    const getInquiry = async (e) => {
        e.preventDefault();
    try {
        console.log({name,email,mobile,subject,message});
      var data = await axios.post("http://localhost:8000/Inquiry_add",{
        name: name,
        email: email,
        mobile: mobile,
        subject: subject,
        message: message
      });
      console.log("Inquiry Successfully")
      console.log(data)
    } catch (error) {
      console.log   ("ERROR => ", error);
    }
  };
  return (
    <>
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="text-primary text-uppercase">|| Contact Us ||</h6>
                <h1 className="mb-5">Contact For Any Query</h1>
            </div>
            <div className="row g-4">
                <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                    <iframe className="position-relative rounded w-100 h-100"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d59507.233368723566!2d72.8498176!3d21.2238336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1703589444996!5m2!1sen!2sin" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                        frameborder="0" Style={{minHeight:"350px",border:"0"}}  aria-hidden="false"
                        tabindex="0"></iframe>
                </div>
                <div className="col-md-6">
                    <div className="wow fadeInUp" data-wow-delay="0.2s">
                        <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                        <form onSubmit={getInquiry}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" onChange={(e)=>{Setname(e.target.value)}} id="name" placeholder="Your Name" />
                                        <label for="name">Your Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" onChange={(e)=>{Setemail(e.target.value)}} id="email" placeholder="Your Email" />
                                        <label for="email">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="mobile" onChange={(e)=>{Setmobile(e.target.value)}} placeholder="Subject" />
                                        <label for="mobile">Mobile No-:</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="subject" onChange={(e)=>{Setsubject(e.target.value)}} placeholder="Subject" />
                                        <label for="subject">Subject</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a message here" onChange={(e)=>{Setmessage(e.target.value)}} id="message" style={{height:"100px "}} />
                                        <label for="message">Message</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
       
    </>
  )
}

export default Contact
