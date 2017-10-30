import React, { Component } from 'react';
import PreviousButton from './previousButton.js';
import NextButton from './nextButton.js';
import PlayPause from './playPause.js';
import Fullscreen from './fullscreen.js';
import VolumeSlider from './volume.js';
import './controls.css';

class ControlBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    hoverStart() {
        if (this.props.slideEnd) {
            return;
        }
        this.setState({ show: true });
        clearTimeout(this.controlTimer);
        this.controlTimer = setTimeout(function () {
            if (this.props.slideEnd) {
                return;
            }
            this.setState({ show: false });
        }.bind(this), 3000);
    }

    render() {
        let controlBoxStyle = {
            position: 'relative',
            bottom: '5px',
            height: '20px',
            backgroundColor: 'black',
            textDecoration: 'none',
            padding: '8px',
            display: this.state.show ? 'block' : this.props.slideEnd ? 'block' : 'none'
        }
        return (
            <div style={controlBoxStyle} >
                <PreviousButton gotoIndex={this.props.gotoIndex} currentIndex={this.props.currentIndex} />
                <PlayPause audio={this.props.audio} replay={this.props.replay} slideEnd={this.props.slideEnd} />
                <NextButton gotoIndex={this.props.gotoIndex} currentIndex={this.props.currentIndex} />
                <Fullscreen canvas={this.props.canvas} />
                <VolumeSlider audio={this.props.audio}/>  
            </div>
        )
    }
}

export default ControlBox;