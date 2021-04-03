import React from 'react';
import Select from 'react-select';
import { Card } from 'react-bootstrap';
import './App.css'
function App() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div className="App">
      <center><h1 style={{ marginTop: "10vh", color: "white" }}>Youtube Matchmaking</h1></center>
      <center><input type="text" className="mx-auto" placeholder="   &#xF002;   Search" style={{ width: '50vw', height: '5vh', fontFamily: 'Arial, FontAwesome', outline: 'none', padding: '10px', marginTop: "10vh" }} /></center>
      <div style={{ width: "10vw", marginLeft: "25vw", marginTop: "3vh", float: "left" }}>
        <Select
          options={options}
          placeholder="Categories"
        />
      </div>
      <div style={{ width: "10vw", marginLeft: "5vw", marginTop: "3vh", float: "left" }}>
        <Select
          options={options}
          placeholder="Location"
        />
      </div>
      <div>
        <Card style={{ width: '18rem', backgroundColor: "black", color: "white" }}>
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
  );
}

export default App;
