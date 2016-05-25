import React from 'react';
import { Link } from 'react-router';

import DealerSpeedForm from './dealer_speed_form';


export class Settings extends React.Component {
    render() {
        return (
            <div className="settings">
                <h1>Settings</h1>
                <div className="links">
                    <Link to="/">Back to game</Link>
                    <DealerSpeedForm />
                </div>
            </div>
        );
    }
}