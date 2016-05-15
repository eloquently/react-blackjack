// app/components/info.js

import React from 'react';
import { connect } from 'react-redux';

import { dealToPlayer, stand } from '../action_creators';

export class Info extends React.Component {
    render() {
        return (
            <div id="info">
                <span id="player_record">
                    Wins: {this.props.winCount} Losses: {this.props.lossCount}
                </span>
                <span id="buttons">
                    <button disabled={this.props.hasStood}
                            onClick={this.props.onClickHit}>
                        Hit
                    </button>
                    <button disabled={this.props.hasStood}
                            onClick={this.props.onClickStand}>
                        Stand
                    </button>
                </span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        winCount: state.get('winCount'),
        lossCount: state.get('lossCount'),
        hasStood: state.get('hasStood')
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onClickHit: () => {
            dispatch(dealToPlayer());
        },
        onClickStand: () => {
            dispatch(stand());
        }
    };
};

export const InfoContainer = connect(mapStateToProps, mapDispatchToProps)(Info);