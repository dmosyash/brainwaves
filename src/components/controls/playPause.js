import React, { Component } from 'react';
import './controls.css';

class PlayPause extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlay: true
        }
    }
    toggle() {
        let is_play = this.state.isPlay;
        this.props.playToggle(!is_play);
        this.setState({
            isPlay: !is_play
        })
    }

    render() {
        return (
            <div className={this.state.isPlay ? 'pause' : 'play'} onClick={() => this.toggle()}></div>
        )
    }
}

export default PlayPause;