// app/action_creators.js

export function setupGame() {
    return { "type": "SETUP_GAME" };
}

export function setRecord(wins, losses) {
    return { 
        "type": "SET_RECORD",
        "wins": wins,
        "losses": losses,
    };
}