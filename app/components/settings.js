import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import DealerSpeedForm from './dealer_speed_form';

export class Settings extends React.Component {
    render() {
        return (
            <div className="settings">
                <h1>Settings</h1>
                <div className="links">
                    <Link to="/">Back to game</Link>
                </div>
                
                <DealerSpeedForm currentSpeed={this.props.currentSpeed} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSpeed: state.settings.get('speed')
    };
}

export const SettingsContainer = connect(mapStateToProps)(Settings);