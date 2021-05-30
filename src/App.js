import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { getData } from './dataHelpers';
import { Card } from 'react-bootstrap';
import './App.css'
function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [timezone, setTimezone] = useState('');
  const [timezoneRange, setTimezoneRange] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    setData([])
    setLoading(true);
    setErr(false);
    e.preventDefault();
    try {
      let res = await getData(title, lowerLimit, upperLimit, timezone, timezoneRange, true);
      if (res.data.errorType) {
        res = await getData(title, lowerLimit, upperLimit, timezone, timezoneRange, false);
        if (res.data.errorType)
          setErr(true);
      }
      console.log(res.data.body)
      setLoading(false);
      let arr = [];
      for (let i = 0; i < res?.data?.body?.length; i++) {
        if (res?.data?.body[i]?.collab) {
          arr.unshift(res?.data?.body[i]);
        }
        else
          arr.push(res?.data?.body[i]);
      }
      setData(arr);
    }
    catch (err) {
      setErr(true);
    }
  }
  const handleChange = (e) => {
    if (e.target.name === "lower")
      setLowerLimit(e.target.value)
    else if (e.target.name === "upper")
      setUpperLimit(e.target.value)
    else if (e.target.name === "timezone")
      setTimezone(e.target.value)
    else
      setTimezoneRange(e.target.value)
  }
  const onChange = (e) => {
    setTitle(e.target.value);
  }
  return (
    <center>
      <div style={{ float: "right", margin: "80px" }}>
        <button style={{ margin: "10px", padding: "3px 10px", background: "#0d324d", color: "white", border: "1px solid white", borderRadius: "5px" }}>Login</button>
        <button style={{ margin: "10px", padding: "3px 10px", background: "#0d324d", color: "white", border: "1px solid white", borderRadius: "5px" }}>Signup</button>
      </div>
      <div className="App" style={{ width: "50vw" }}>
        <center>
          <h1 style={{ paddingTop: "10vh", color: "white" }}>Youtube Matchmaking</h1></center>
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
            <input placeholder="Lower Limit" name="lower" onChange={(e) => handleChange(e)} value={lowerLimit} />
          </Col>
          <Col md={3}>
            <input placeholder="Upper Limit" name="upper" onChange={(e) => handleChange(e)} value={upperLimit} />
          </Col>
        </Row>
        <Row style={{ marginTop: "3vh", marginLeft: "1vw" }}>
          <b>TimeZone:-</b>
        </Row>
        <Row style={{ marginTop: "1vh" }}>
          <Col md={3}>
            <input placeholder="UTC +- {hh}" value={timezone} name="timezone" onChange={(e) => handleChange(e)} />
          </Col>
          <Col md={6}>
            <p>Enter 5 for +5 UTC or -10 for -10 UTC</p>
          </Col>
        </Row>
        <Row style={{ marginTop: "3vh", marginLeft: "1vw" }}>
          <b>TimeZone Range:-</b>
        </Row>
        <Row style={{ marginTop: "1vh" }}>
          <Col md={3}>
            <input placeholder="hh" value={timezoneRange} name="timezone-range" onChange={(e) => handleChange(e)} />
          </Col>
          <Col md={6}>
            <p>Enter 2 for +- 2 hours their local time</p>
          </Col>
        </Row>
        {loading ?
          <center>
            <i class="fas fa-spinner fa-pulse fa-5x"></i>
          </center>
          : ''
        }
        {data?.length > 0 ?
          data.map((d) => {
            return (
              <div style={{ display: "block", marginTop: "5vh" }}>
                <a href={`https://www.youtube.com/channel/${d?.id}`} rel="noreferrer noopener" target="_blank">
                  <Card style={{ backgroundColor: "#121212", color: "white" }}>
                    <Card.Img variant="top" src={d?.image} loading="lazy" />
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
            <h4>Whoops 🙁</h4>
            <p>
              We don't have any data on this keyword.
            </p>
          </div>
          : ''
        }
      </div>
    </center>
  );
}

export default App;
