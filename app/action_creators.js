export function setupGame(seed=new Date().getTime()) {
    return { "type": "SETUP_GAME", seed };
}

export function setRecord(wins, losses) {
    return { "type": "SET_RECORD", wins, losses };
}

export function dealToPlayer(seed=new Date().getTime()) {
    return { "type": "DEAL_TO_PLAYER", seed };
}

export function stand(seed=new Date().getTime()) {
    return { "type": "STAND", seed };
}

export function dealToDealer(seed=new Date().getTime()) {
    return { "type": "DEAL_TO_DEALER", seed };
}

export function determineWinner() {
    return { "type": "DETERMINE_WINNER" };
}

export function setSpeed(newSpeed) {
    return { "type": "SET_SPEED", newSpeed };
}

export function fetchRecord() {
    return { "type": "FETCH_RECORD" };
}

export function fetchingRecord() {
    return { "type": "FETCHING_RECORD" };
}

export function fetchedRecord() {
    return { "type": "FETCHED_RECORD" };
}

export function putRecord() {
    return { "type": "PUT_RECORD" };
}

export function savingRecord() {
    return { "type": "SAVING_RECORD" };
}

export function savedRecord() {
    return { "type": "SAVING_RECORD" };
}