import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  let [country, setCountry] = useState('')
  let [countries, setCountries] = useState([])

  useEffect(() => {
    const axios = require("axios");

    axios({
      "method":"GET",
      "url":"https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all",
      "headers": {
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"ajayakv-rest-countries-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY
      }
    })
    .then((response)=>{
      setCountries(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      phone,
      countryCallingCode: country
    }
    axios.post('/.netlify/functions/sendMessage', data)
    .then(res => console.log('success'))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <main>
        <Container fluid>
          <Row className="justify-content-center">
            <Col md="7">
              <Form onSubmit={handleSubmit}>
                <h1 className="text-center">Sign-Up</h1>
                  <Form.Group controlId="Name">
                    <Form.Label><b>Name</b></Form.Label>
                    <Form.Control
                      as='input'
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Your Name'
                      />
                  </Form.Group>
                  <Form.Group controlId="Name">
                    <Form.Label><b>Email</b></Form.Label>
                    <Form.Control
                      as='input'
                      value={email}
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='example@example.com'
                      />
                  </Form.Group>
                  <Form.Group controlId="Name">
                    <Form.Label><b>Phone</b></Form.Label>
                    <Form.Control
                      as='input'
                      pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                      value={phone}
                      type='tel'
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='1234567890'
                      />
                    <small>Format: 1234567890</small>
                  </Form.Group>
                  <Form.Group controlId="Name">
                    <Form.Label><b>Country</b></Form.Label>
                    <Form.Control
                      as='select'
                      value={country}
                      type='text'
                      required
                      onChange={(e) => setCountry(e.target.value)}
                      >
                        {countries.map(country => {
                          if (country.name === "Canada") {
                            return <option value={country.callingCodes[0]} key={country.name}>Canada/United States</option>
                          } else {
                            return <option value={country.callingCodes[0]} key={country.name}>{country.name}</option>
                          }
                        })}
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
