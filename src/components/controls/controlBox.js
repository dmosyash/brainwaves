import React, { Component } from 'react';
import PreviousButton from './previousButton.js';
import NextButton from './nextButton.js';
import PlayPause from './playPause.js';
import VolumeSlider from './volume.js';
import './controls.css';

class ControlBox extends Component {

    render() {
        let controlBoxStyle = {
            position: 'relative',
            // bottom: '10px',
            height: '20px',
            backgroundColor: 'black',
            textDecoration: 'none',
            padding: '8px'
        }
        return (
            <div style={controlBoxStyle} >
                <NextButton gotoIndex={this.props.gotoIndex} currentIndex={this.props.currentIndex}/>
                <PlayPause playToggle={this.props.playToggle}/>
                <PreviousButton gotoIndex={this.props.gotoIndex} currentIndex={this.props.currentIndex}/>
                <VolumeSlider />
            </div>
        )
    }
}

export default ControlBox;