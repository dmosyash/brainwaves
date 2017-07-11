import React, { Component } from 'react';
import Content from './components/content';
import contentList from './components/contentList';
import { Howl } from 'howler';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: contentList[0]
    }
    this.audio = null;
  }

  componentDidMount() {
    this.audio = new Howl({
        src: contentList[0].audio
    });
    this.audio.play();
  }

  selectedContent(item) {
    this.setState({
      content: item
    });
    this.audio.stop();
    this.audio = new Howl({
        src: item.audio
    });
    this.audio.play();
  }

  listOfContents() {
    return contentList.map((v) => {
      return (
        <div key={v.id} width="100" height="50" style={{border: '1px solid'}} onClick={() => this.selectedContent(v)}>
          <h5>{v.name}</h5>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={8}>
              <Content src={this.state.content.image} />
            </Col>
            <Col xs={12} sm={12} md={4}>
              { this.listOfContents() }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
