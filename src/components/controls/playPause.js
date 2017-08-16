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
        if(is_play) {
            this.props.audio.pause();
        } else {
            this.props.audio.play();
        }
        this.setState({
            isPlay: !is_play
        })
    }

    replay() {
        // this.props.replay();
        this.props.audio.play();
    }

    render() {
        let slideEnd = this.props.slideEnd;
        let playPause = (<div className={this.state.isPlay ? 'pause' : 'play'} onClick={() => this.toggle()}></div>);
        let replay = (< div className="repeat" onClick={() => this.replay()} ><i className="fa fa-repeat fa-2x"></i></div >)
        if (slideEnd) {
            return replay;
        } else {
            return playPause;
        }
    }
}

export default PlayPause;