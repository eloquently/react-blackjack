import React from 'react';
import { Link } from 'react-router';

export class Settings extends React.Component {
    render() {
        return (
            <div id="settings">
                <div class="links">
                    <Link to="/">Back to game</Link>
                </div>
                <h1>Settings</h1>
            </div>
        );
    }
}