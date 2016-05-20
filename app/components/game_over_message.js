import React from 'react';
import { connect } from 'react-redux';
import { setupGame } from '../action_creators';

export class GameOverMessage extends React.Component {
    render() {
        return (
            <div id="game_over_message">
                { this.props.win ? 'You win!' : 'You lose :(' }
                <button onClick={this.props.nextGame}>Next Game</button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        nextGame: () => dispatch(setupGame())
    };
}

export const GameOverMessageContainer = connect(undefined, mapDispatchToProps)(GameOverMessage);