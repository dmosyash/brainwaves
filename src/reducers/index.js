import { combineReducers } from 'redux';
import BrainwavesList from './brainwaves.js';
import SelectedWave from './selectedWave.js';

const rootReducer = combineReducers({
    brainwaves: BrainwavesList,
    selectedWave: SelectedWave
});

export default rootReducer;
