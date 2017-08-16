import React, { Component } from 'react';
import BrainwaveDetails from './containers/brainwaveDetails.js';
import BrainwavesList from './containers/brainwavesList.js';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={8}>               
              <BrainwaveDetails />
            </Col>
            <Col xs={12} sm={12} md={4}>
              <h3>BRAINWAVES</h3>
              <BrainwavesList />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;