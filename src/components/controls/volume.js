import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import './controls.css';
import 'react-rangeslider/lib/index.css'

class VolumeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volume: 100
    }
  }
  
  componentDidMount () {
    console.log(this.state.volume);
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value
    });
    this.props.audio.volume(value / 100);
  }

  render() {
    let { volume } = this.state
    let sliderStyle = {
        position: 'absolute',
        bottom: '-5px',
        left: '230px',
        width: '50%'
    }
    return (
      <div style={sliderStyle} className="responsive-volume">
            <Slider
                value={volume}
                onChange={this.handleOnChange}
            />  
        </div>
    )
  }
}

export default VolumeSlider;