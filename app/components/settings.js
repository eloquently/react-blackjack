import React from 'react';
import { Link } from 'react-router';

export class Settings extends React.Component {
    render() {
        return (
            <div className="settings">
                <h1>Settings</h1>
                <div className="links">
                    <Link to="/">Back to game</Link>
                </div>
            </div>
        );
    }
}