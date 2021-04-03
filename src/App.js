import React from 'react';
import Select from 'react-select';
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
        />
      </div>
      <div style={{ width: "10vw", marginLeft: "5vw", marginTop: "3vh", float: "left" }}>
        <Select
          options={options}
        />
      </div>
    </div>
  );
}

export default App;
