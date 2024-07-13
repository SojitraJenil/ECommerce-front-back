import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { RenderHost } from "../../API/Api";

function EmailUpdate() {
  useEffect(() => {
    setEmail(localStorage.getItem("userEmail"));
    console.log(Math.floor(100000 + Math.random() * 900000));
  }, []);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    axios
      .post(`${RenderHost}/send-email`, {
        to: email,
        subject: subject,
        text: message,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //     // const Update_email = async () => {
  //     //   try {
  //     //     const response = await axios.post(`${RenderHost}/Update_user/${id}`,{
  //     //     } );
  //     //     console.log(response);
  //     //   //  setEmail(localStorage.getItem("userEmail"));
  //     //   } catch (error) {
  //     //     console.error("An error occurred:", error);
  //     //   }
  //     // };
  return (
    <div>
      <div>
        <Container>
          <div>
            <input
              type="email"
              placeholder="Recipient Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendEmail}>Send Email</button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default EmailUpdate;
