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

    replay() {
        this.props.replay();
    }

    render() {
        let slideEnd = this.props.slideEnd;
        return (   
            <div>         
            {/*<div className='replay' onClick={() => this.replay()}></div>
            <div className={this.state.isPlay ? 'pause' : 'play'} onClick={() => this.toggle()}></div>*/}
            { slideEnd ? <div onClick={() => this.replay()}><path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z"/>R</div> : <div className={this.state.isPlay ? 'pause' : 'play'} onClick={() => this.toggle()}></div> }
            </div>
        )
    }
}

export default PlayPause;