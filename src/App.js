import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { getData } from './dataHelpers';
import './App.css'
function App() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await getData();
    console.log(res);
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
            <input type="text" className="mx-auto" placeholder="   &#xF002;   Search" style={{ width: '95%', height: '5vh', fontFamily: 'Arial, FontAwesome', outline: 'none', padding: '10px', marginTop: "10vh" }} />
            <button type="submit" style={{ background: "none", border: "none", outline: "none", fontSize: "20px" }}><i className="fa fa-search"></i></button>
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
        <div style={{ display: "block", marginTop: "5vh" }}>
          <Card style={{ backgroundColor: "#121212", color: "white" }}>
            <Card.Img variant="top" src="https://content.fortune.com/wp-content/uploads/2019/12/GettyImages-1192917838-e1576245538349.jpg" />
            <Card.Body>
              <Card.Title>MKBHD</Card.Title>
              <Card.Text>
                Matte Black Everything
          </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </center>
  );
}

export default App;
