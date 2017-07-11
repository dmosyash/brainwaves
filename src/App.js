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
      content: contentList[0],
      controls: null
    }
    this.audio = null;
  }

  onAudioEnd() {
    this.setState({controls: (
      <div className="controls">
        <button className="next-button" onClick={() => this.selectedContent(contentList[this.state.content.order + 1])}>Next</button>
        <button className="previous-button" onClick={() => this.selectedContent(contentList[this.state.content.order + 1])}>Previous</button>
      </div>
    )});
  }

  componentDidMount() {
    this.audio = new Howl({
        src: contentList[0].audio,
        onend: this.onAudioEnd.bind(this)
    });
    this.audio.play();
  }

  selectedContent(item) {
    let that = this;
    this.setState({
      content: item,
      controls: null
    });
    this.audio.stop();
    this.audio = new Howl({
        src: item.audio,
        onend: this.onAudioEnd.bind(this)
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
              <div className="content-holder">
                <Content src={this.state.content.image}/>
                {this.state.controls}
              </div>
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
