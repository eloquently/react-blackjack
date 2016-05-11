// app/components/app.js

import React from 'react';
import Info from './info';

export default class App extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div className="app">
                <h1>React Blackjack</h1>
                <Info   winCount={this.props.state.get('winCount')}
                        lossCount={this.props.state.get('lossCount')}
                        hasStood={this.props.state.get('hasStood')} />
            </div>
        );
    }
};