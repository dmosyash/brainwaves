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
    this.controlsDOM = (
      <div className="controls">
        <ControlBox gotoIndex={this.gotoIndex.bind(this)} currentIndex={this.state.content.order} playToggle={this.playPauseToggle.bind(this)} slideEnd={this.slideEnd}/>
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
    this.slideEnd = true;
    this.setState({controls: (<div className="controls">
        <ControlBox gotoIndex={this.gotoIndex.bind(this)} currentIndex={this.state.content.order} playToggle={this.playPauseToggle.bind(this)} slideEnd={this.slideEnd} replay={this.replay.bind(this)} />
    </div>),
      suggestions: (
        <div className="suggestions">
          { this.listOfContents() }
        </div>
      )
    });
  }

  hoverStart(){
    if(this.slideEnd) {
      return;
    }
    this.hover = !this.hover;
    if(this.hover) {
      this.setState({controls: this.controlsDOM});
    }
  }

  hoverEnd(){
    if(this.slideEnd) {
      return;
    }
    setTimeout(function () {
      this.hover = !this.hover;
      if(!this.hover) {
        this.setState({controls: null});
      }
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
    alert('replay');
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

  fullScreen() {
    console.log(this.canvas);
    if (this.canvas.requestFullscreen) {
      this.canvas.requestFullscreen();
    } else if (this.canvas.msRequestFullscreen) {
      this.canvas.msRequestFullscreen();
    } else if (this.canvas.mozRequestFullScreen) {
      this.canvas.mozRequestFullScreen();
    } else if (this.canvas.webkitRequestFullscreen) {
      this.canvas.webkitRequestFullscreen();
    }
    window.screen.orientation.lock('landscape').then(null, function(error) {
      alert(error);
      // document.exitFullscreen()
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={8}>
              <div className="content-holder" onMouseEnter={() => this.hoverStart()} onMouseLeave={() => this.hoverEnd()} ref={(input) => {this.canvas = input}}>
                <Content src={this.state.content.image} />
                { this.state.controls }
                { this.state.suggestions }
              </div>
            </Col>
            <Col xs={12} sm={12} md={4}>
              <h3>BRAINWAVES</h3>
              { this.listOfContents() }
              <button type="button" onClick={() => this.fullScreen()}>Fullscreen</button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;