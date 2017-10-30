import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectWave } from './../actions/index.js';

class BrainwavesList extends Component {
    renderList() {
        return this.props.brainwaves.map((wave, i) => {
            return (<li key={i} className="list-group-item" onClick={() => this.props.selectWave(wave)}>{wave.name}</li>);
        })
    }

    render() {
        return (
            <ul className="list-group col-md-4">
                {this.renderList()}
            </ul>
        );
    }
}

export default connect(state => ({ brainwaves: state.brainwaves }), { selectWave })(BrainwavesList);