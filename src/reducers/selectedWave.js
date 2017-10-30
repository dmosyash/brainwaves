import { SELECT_WAVE } from './../actions/index.js';
import { GOTO_WAVE } from './../actions/index.js';
import BrainwavesList from './brainwaves.js';

export default function selectedWave(state = null, action) {
    switch (action.type) {
        case SELECT_WAVE:
            return action.data;
        case GOTO_WAVE:
            return BrainwavesList()[action.data]; 
        default:
            return BrainwavesList()[0];    
    }
}