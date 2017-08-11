import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goToWave } from './../actions/index.js';
import ControlBox from './../components/controls/controlBox';
import './../App.css';

class BrainwaveDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showControls: 'none'
        }
        this.controlTimer = null;
        this.hover = false;
        this.slideEnd = false; 
    }

    hoverStart() {
        if (this.slideEnd) {
            return;
        }
        clearTimeout(this.controlTimer);
        this.hover = true;
        this.setState({ showControls: 'block' });
        this.controlTimer = setTimeout(function () {
            if (this.slideEnd) {
                return;
            }
            this.hover = false;
            this.setState({ showControls: 'none' });
        }.bind(this), 3000);
    }

    render() {
        if (!this.props.activeWave) {
            return <h3>Please select any Brainwave</h3>;
        }

        return (
            <div onMouseMove={() => this.hoverStart()}>
                <img alt="sdf" src={this.props.activeWave.image} width="100%" />
                <div className="controls" style={{ display: this.state.showControls }}>
                    <ControlBox gotoIndex={this.props.goToWave.bind(this)} currentIndex={this.props.activeWave.order} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeWave: state.selectedWave
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ goToWave }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BrainwaveDetails);