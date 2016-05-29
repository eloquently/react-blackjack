import React from 'react';
import { reduxForm } from 'redux-form';

export class DealerSpeedForm extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div class="dealer-speed-form">
                <form onSubmit={this.props.handleSubmit}>
                    {[
                        ["Fast", 250], 
                        ["Normal", 750],
                        ["Slow", 1500]
                     ].map((el) => (
                        <label key={el[1]}>
                            {el[0]}
                            <input type="radio" 
                                   name="speed"
                                   value={el[1]} />
                        </label>
                      ))
                    }
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export const DealerSpeedFormContainer = reduxForm({
    form: 'dealerSpeed',
    fields: ['speed']
})(DealerSpeedForm);