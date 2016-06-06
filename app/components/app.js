import React from 'react';
import { Link } from 'react-router';
import { InfoContainer } from './info';
import Hand from './hand';
import { connect } from 'react-redux';
import { GameOverMessageContainer } from './game_over_message';

export class App extends React.Component {
    render() {
        let messageComponent;
        if(this.props.gameOver) {
            messageComponent = <GameOverMessageContainer win={this.props.playerWon} />;
        }
        
        let gameComponent;
        if(this.props.fetchingRecord) {
            gameComponent = <h1>Loading record...</h1>;
        } else {
            gameComponent = (
                <div class="game">
                    <InfoContainer />
                    { messageComponent }
                    <strong>Player hand:</strong>
                    <Hand cards={this.props.playerHand } />
                    <strong>Dealer hand:</strong>
                    <Hand cards={this.props.dealerHand } />
                </div>
            );
        }
        
        return (
            <div className="app">
                <div className="links">
                    <Link to="/settings">Settings</Link>    
                </div>
                <h1>React Blackjack</h1>
                {gameComponent}
                {this.props.patchingRecord ? 
                    "Saving..." 
                    : "" }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playerHand: state.game.get('playerHand'),
        dealerHand: state.game.get('dealerHand'),
        gameOver: state.game.get('gameOver'),
        playerWon: state.game.get('playerWon'),
        fetchingRecord: state.api.get('fetchingRecord'),
        patchingRecord: state.api.get('patchingRecord')
    };
}

export const AppContainer = connect(mapStateToProps)(App);