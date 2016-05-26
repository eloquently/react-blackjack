import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import url from 'url';
import queryString from 'query-string';

import DealerSpeedForm from './dealer_speed_form';

export class Settings extends React.Component {
    saveUrl() {
        const u = url.parse(window.location.href);
        const qs = queryString.parse(u.query);
        qs.user = this.props.currentToken;
        u.query = queryString.stringify(qs);
        u.hash = undefined;
        u.search = u.query;
        return url.format(u);
    }
    render() {
        return (
            <div className="settings">
                <h1>Settings</h1>
                <div className="links">
                    <Link to="/">Back to game</Link>
                </div>
                
                <DealerSpeedForm currentSpeed={this.props.currentSpeed} />
                <p>
                    To load your game, visit <a href={this.saveUrl()}>{this.saveUrl()}</a>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSpeed: state.settings.get('speed'),
        currentToken: state.settings.get('userToken')
    };
}

export const SettingsContainer = connect(mapStateToProps)(Settings);