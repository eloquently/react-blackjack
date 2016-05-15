// app/components/app.js

import React from 'react';
import { InfoContainer } from './info';
import Hand from './hand';
import { connect } from 'react-redux';

export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1>React Blackjack</h1>
                <InfoContainer />
                <strong>Player's hand:</strong>
                <Hand cards={this.props.playerHand } />
                <strong>Dealer's hand:</strong>
                <Hand cards={this.props.dealerHand } />
            </div>
        );
    }
};

function mapStateToProps(state) {
  return {
    playerHand: state.get('playerHand'),
    dealerHand: state.get('dealerHand')
  };
}

export const AppContainer = connect(mapStateToProps)(App);