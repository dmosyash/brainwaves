import React, { Component } from 'react';
import { Howl } from 'howler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goToWave } from './../actions/index.js';
import ControlBox from './../components/controls/controlBox';
import './../App.css';

class BrainwaveDetails extends Component {
    constructor(props) {
        super(props);
        slideChange = true;
        this.state = {
            slideEnd: false
        }
    }

    componentDidUpdate() {
        if(slideChange) {
            if(this.state.slideEnd) {
                this.setState({slideEnd: false});
            }
        }
    }

    onAudioEnd() {
        slideChange = false;
        this.setState({slideEnd: true});
    }

    render() {
        if (!this.props.activeWave) {
            return <h3>Please select any Brainwave</h3>;
        }

        if(this.audio) {
            this.audio.stop();
        }
        if(!this.state.slideEnd) {
            this.audio = new Howl({
                src: this.props.activeWave.audio,
                onend: this.onAudioEnd.bind(this)
            });
            this.audio.play();
        }

        return (
            <div ref={input1 => this.container = input1} onMouseMove={() => this.controls.hoverStart()}>
                <img alt="sdf" src={this.props.activeWave.image} width="100%" />
                <div className="controls">
                    <ControlBox ref={(input) => this.controls = input} gotoIndex={this.props.goToWave.bind(this)} currentIndex={this.props.activeWave.order} audio={this.audio} slideEnd={this.state.slideEnd} canvas={this.container} />
                </div>
            </div>
        );
    }
}

let slideChange = false;
function mapStateToProps(state) {
    slideChange = true;
    return {
        activeWave: state.selectedWave
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ goToWave }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BrainwaveDetails);