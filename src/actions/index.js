export const SELECT_WAVE = 'SELECT_WAVE';
export const GOTO_WAVE = 'GOTO_WAVE';

export function selectWave(wave) {
    return {
        type: SELECT_WAVE,
        data: wave
    };
}

export function goToWave(index) {
    return {
        type: GOTO_WAVE,
        data: index
    };
}