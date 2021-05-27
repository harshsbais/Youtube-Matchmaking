import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { getData } from './dataHelpers';
import { Card } from 'react-bootstrap';
import './App.css'
function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [err, setErr] = useState(false);
  const onSubmit = async (e) => {
    setErr(false);
    e.preventDefault();
    try {
      const res = await getData(title, 1, 1000);
      setData(res?.data?.body)
    }
    catch (err) {
      setErr(true);
    }
  }
  const onChange = (e) => {
    setTitle(e.target.value);
  }
  return (
    <center>
      <div className="App" style={{ width: "50vw" }}>
        <center><h1 style={{ marginTop: "10vh", color: "white" }}>Youtube Matchmaking</h1></center>
        <center>
          <Form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" className="mx-auto" placeholder="   &#xF002;   Search" style={{ width: '95%', height: '5vh', fontFamily: 'Arial, FontAwesome', outline: 'none', padding: '10px', marginTop: "10vh" }} />
            <button type="submit" style={{ background: "none", border: "none", outline: "none", fontSize: "20px", color: "white" }}><i className="fa fa-search"></i></button>
          </Form>
        </center>
        <Row style={{ marginTop: "3vh", marginLeft: "1vw" }}>
          <b>Subscriber Range:-</b>
        </Row>
        <Row style={{ marginTop: "1vh" }}>
          <Col md={3}>
            <input placeholder="Lower Limit" />
          </Col>
          <Col md={3}>
            <input placeholder="Upper Limit" />
          </Col>
        </Row>
        <Row style={{ marginTop: "3vh", marginLeft: "1vw" }}>
          <b>TimeZone:-</b>
        </Row>
        <Row style={{ marginTop: "1vh" }}>
          <Col md={3}>
            <input placeholder="GMT +- {hh:mm}" />
          </Col>
        </Row>
        {data?.length > 0 ?
          data.map((d) => {
            return (
              <div style={{ display: "block", marginTop: "5vh" }}>
                <a href={`https://www.youtube.com/channel/${d?.id}`} rel="noreferrer noopener" target="_blank">
                  <Card style={{ backgroundColor: "#121212", color: "white" }}>
                    <Card.Img variant="top" src={d?.image} />
                    <Card.Body>
                      <Card.Title>{d?.title}</Card.Title>
                      <Card.Text>
                        Subscriber Count:- {d?.subscriberCount}<br />
                        {d?.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </div>
            )
          })
          : ''
        }
        {err ?
          <div style={{ marginTop: "20px", color: "white" }}>
            <p style={{ fontWeight: "800" }}>No Data</p>
          </div>
          : ''
        }
      </div>
    </center>
  );
}

export default App;
