import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { getData } from './dataHelpers';
import './App.css'
function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await getData(title);
    setData(JSON.parse(res.data.body))
    console.log(JSON.parse(res.data.body))
  }
  const onChange = (e) => {
    setTitle(e.target.value);
  }
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
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
        <Row style={{ marginTop: "3vh" }}>
          <Col md={3}>
            <Select
              options={options}
              placeholder="Categories"
            />
          </Col>
          <Col md={3}>
            <Select
              options={options}
              placeholder="Location"
            />
          </Col>
        </Row>
        <div style={{ marginTop: "20px", color: "white" }}>
          {console.log(data[0])}
          You Searched for {data[0]?.title || ""} <br />
          <pre style={{ color: "white" }}>{JSON.stringify(data, null, 2)}</pre>
        </div>
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
