import { Map } from 'immutable';

const setSpeed = (currentState, newSpeed) => {
    return currentState.merge({speed: newSpeed});
};


export default function(currentState=new Map(), action) {
    switch(action.type) {
        case 'SET_SPEED':
            return setSpeed(currentState, action.newSpeed);
    }
    return currentState;
}