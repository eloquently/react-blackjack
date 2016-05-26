import { Map } from 'immutable';

export default function(currentState=new Map(), action) {
    switch(action.type) {
        case 'FETCHING_RECORD':
            return currentState.merge({fetchingRecord: true});
        case 'FETCHED_RECORD':
            return currentState.merge({fetchingRecord: false});
        case 'SAVING_RECORD':
            return currentState.merge({savingRecord: true});
        case 'SAVED_RECORD':
            return currentState.merge({savingRecord: false});
    }
    return currentState;
}