import React from 'react';
import { InfoContainer } from './info';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { GameOverMessageContainer } from './game_over_message';
import Hand from './hand';

export class App extends React.Component {
    render() {
        let messageComponent;
        if(this.props.gameOver) {
            messageComponent = <GameOverMessageContainer win={this.props.playerWon} />;
        }
        
        let mainContent;
        
        if(!this.props.fetchingRecord) {
            mainContent = (
                <div>
                    <InfoContainer />
                    { messageComponent }
                    <strong>Player hand:</strong>
                    <Hand cards={this.props.playerHand } />
                    <strong>Dealer hand:</strong>
                    <Hand cards={this.props.dealerHand } />
                </div>
            );
        } else {
            mainContent = (
                <h3>Loading ...</h3>
            );
        }
        
        return (
            <div className="app">
                <h1>React Blackjack</h1>
                <div className="links">
                    <Link to="/settings">Settings</Link>
                </div>
                { mainContent }
                { this.props.savingRecord ? "Saving..." : undefined }
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
        savingRecord: state.api.get('savingRecord')
    };
}

export const AppContainer = connect(mapStateToProps)(App);