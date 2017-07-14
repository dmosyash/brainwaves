import React, { Component } from 'react';
import Content from './components/content';
import contentList from './components/contentList';
import ControlBox from './components/controls/controlBox';
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

  componentWillMount () {
    this.state.controls = (
      <div className="controls">
        <ControlBox gotoIndex={this.gotoIndex.bind(this)} currentIndex={this.state.content.order} playToggle={this.playPauseToggle.bind(this)}/>
      </div>
    );
  }

  componentDidMount() {
    this.audio = new Howl({
        src: contentList[0].audio,
        onend: this.onAudioEnd.bind(this)
    });
    this.audio.play();
    let that = this;
    setTimeout(function () {
      that.setState({controls: null})
    }, 1000);
  }

  onAudioEnd() {
    this.setState({controls: (
      <div className="controls">
        <ControlBox gotoIndex={this.gotoIndex.bind(this)} currentIndex={this.state.content.order} playToggle={this.playPauseToggle.bind(this)}/>
      </div>
    ),
    suggestions: (
      <div className="suggestions">
        { this.listOfContents() }
      </div>
    )
    });
  }

  gotoIndex(index) {
    this.selectedContent(contentList[index]);
  }

  playPauseToggle(bool) {
    if(!bool) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  selectedContent(item) {
    this.setState({
      content: item,
      controls: null,
      suggestions: null
    });
    this.audio.stop();
    this.audio = new Howl({
        src: item.audio,
        onend: this.onAudioEnd.bind(this)
    });
    this.audio.play();
    // this.audio.mute(true);
  }

  listOfContents() {
    return contentList.map((v) => {
      return (
        <div key={v.id} className="list-contents" style={{border: '1px solid'}} onClick={() => this.selectedContent(v)}>
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
            <Col xs={12} sm={8} md={8}>
              <div className="content-holder">
                <Content src={ this.state.content.image }/>
                { this.state.suggestions }
                { this.state.controls }
              </div>
            </Col>
            <Col xs={12} sm={4} md={4}>
              <h3>BRAINWAVES</h3>
              { this.listOfContents() }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
