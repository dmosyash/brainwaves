import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import './controls.css';
import 'react-rangeslider/lib/index.css'

class VolumeSlider extends Component {
    constructor(props) {
    super(props)
    this.state = {
      volume: 5
    }
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value
    })
  }

  render() {
    let { volume } = this.state
    let sliderStyle = {
        position: 'absolute',
        bottom: '-7px',
        left: '230px',
        width: '50%'
    }
    return (
        <div style={sliderStyle}>
            <Slider
                value={volume}
                onChange={this.handleOnChange}
            />  
        </div>
    )
  }
}

export default VolumeSlider;