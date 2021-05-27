import React, { useState } from 'react';
import Select from 'react-select';
import { Row, Col, Form } from 'react-bootstrap';
import { getData } from './dataHelpers';
import './App.css'
function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [err, setErr] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await getData(title);
    try {
      setData(JSON.parse(res?.data?.body))
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
          <p>Subscriber Range:-</p>
        </Row>
        <Row style={{ marginTop: "1vh" }}>
          <Col md={3}>
            <input placeholder="Lower Limit" />
          </Col>
          <Col md={3}>
            <input placeholder="Upper Limit" />
          </Col>
        </Row>
        {data.length > 0 ?
          <div style={{ marginTop: "20px", color: "white" }}>
            <p style={{ fontWeight: "800" }}>You Searched for {title || ""} </p>
            <pre style={{ color: "white" }}>{JSON.stringify(data, null, 2)}</pre>
          </div>
          : ''
        }
        {err ?
          <div style={{ marginTop: "20px", color: "white" }}>
            <p style={{ fontWeight: "800" }}>No Data</p>
          </div>
          : ''
        }
        {/* <div style={{ display: "block", marginTop: "5vh" }}>
          <Card style={{ backgroundColor: "#121212", color: "white" }}>
            <Card.Img variant="top" src="https://content.fortune.com/wp-content/uploads/2019/12/GettyImages-1192917838-e1576245538349.jpg" />
            <Card.Body>
              <Card.Title>MKBHD</Card.Title>
              <Card.Text>
                Matte Black Everything
          </Card.Text>
            </Card.Body>
          </Card>
        </div> */}
      </div>
    </center>
  );
}

export default App;
