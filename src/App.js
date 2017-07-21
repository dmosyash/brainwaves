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
    this.hover = false;
    this.slideEnd = false;    
  }

  componentDidMount() {
    this.audio = new Howl({
        src: contentList[0].audio,
        onend: this.onAudioEnd.bind(this)
    });
    this.audio.play();
    this.controlsDOM = (
      <div className="controls">
        <ControlBox gotoIndex={this.gotoIndex.bind(this)} currentIndex={this.state.content.order} playToggle={this.playPauseToggle.bind(this)} slideEnd={this.slideEnd} replay={this.replay.bind(this)} canvas={this.canvas}/>
      </div>
    );
    let that = this;
    setTimeout(function () {
      that.setState({controls: null})
    }, 1000);
  }

  onAudioEnd() {
    this.slideEnd = true;
    this.setState({controls: (<div className="controls">
        <ControlBox gotoIndex={this.gotoIndex.bind(this)} currentIndex={this.state.content.order} playToggle={this.playPauseToggle.bind(this)} slideEnd={this.slideEnd} replay={this.replay.bind(this)} canvas={this.canvas}/>
    </div>),
      suggestions: (
        <div className="suggestions">
          { this.listOfContents() }
        </div>
      )
    });
  }

  hoverStart() {
    if(this.slideEnd) {
      return;
    }
    this.hover = true;
    this.setState({controls: this.controlsDOM});
  }

  hoverEnd(){
    if(this.slideEnd) {
      return;
    }
    setTimeout(function () {
      this.hover = false;
      this.setState({controls: null});
    }.bind(this), 1000);
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

  replay() {
    this.slideEnd = false;
    this.audio.play();
    this.setState({
      controls: null,
      suggestions: null
    });
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
    this.slideEnd = false;
    this.audio.mute(true);
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
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={8} style={{ margin: '0px', padding: '0px' }}>
              <div className="content-holder" onMouseEnter={() => this.hoverStart()} onMouseLeave={() => this.hoverEnd()} ref={(input) => {this.canvas = input}}>
                <Content src={this.state.content.image} />
                { this.state.controls }
                { this.state.suggestions }
              </div>
            </Col>
            <Col xs={12} sm={12} md={4}>
              <h3>BRAINWAVES</h3>
              <div style={{ margin: '20px' }}>{ this.listOfContents() }</div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;