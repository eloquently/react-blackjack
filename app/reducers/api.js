import { Map } from 'immutable';

export default function(currentState = new Map(), action) {
    switch(action.type) {
        case 'FETCHING_RECORD':
            return currentState.set('fetchingRecord', true);
        case 'FETCHED_RECORD': 
            return currentState.set('fetchingRecord', false);
        case 'PATCHING_RECORD':
            return currentState.set('patchingRecord', true);
        case 'PATCHED_RECORD': 
            return currentState.set('patchingRecord', false);
    }
    
    return currentState;
}