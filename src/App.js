import React, { Component } from 'react';
import Content from './components/content';
import contentList from './components/contentList';
import { Howl } from 'howler';
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
        <div style={{width: '200px'}}>
          <Content src={this.state.content.image} />
        </div>
        <div style={{width: '200px'}}>
          { this.listOfContents() }
        </div>
      </div>
    );
  }
}

export default App;
