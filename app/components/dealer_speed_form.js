import React from 'react';
import { reduxForm } from 'redux-form'

export const fields = [ 'speed' ];

class DealerSpeedForm extends React.Component {
    render() {
        const {
            fields: { speed },
            handleSubmit
        } = this.props;
        return (
            <form onSubmit={() => console.log('submitted')}>
                {[['Fast',100], ['Normal',750], ['Slow',2000]].map( (el) => {
                    return (
                        <label key={el[1]}>
                            {el[0]}
                            <input type="radio" 
                                   {...speed} 
                                   name="speed" 
                                   value={el[1]}
                                   onChange={(event) => event.target.form.submit() } />
                        </label>
                    );
                })}
            </form>
        );
    }
}

export default reduxForm({
  form: 'dealerSpeed',
  fields
})(DealerSpeedForm);