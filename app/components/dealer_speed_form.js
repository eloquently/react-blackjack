import React from 'react';
import { reduxForm } from 'redux-form'
import { setSpeed } from '../action_creators';


export const fields = [ 'speed' ];


const submit = (values, dispatch) => {
    dispatch(setSpeed(parseInt(values.speed)));
};

class DealerSpeedForm extends React.Component {
    render() {
        const {
            fields: { speed },
            handleSubmit
        } = this.props;
        
        speed.initialValue = this.props.currentSpeed;
        
        return (
            <form onSubmit={handleSubmit(submit)}>
                {[['Fast', 100], ['Normal', 750], ['Slow', 2000]].map( (el) => {
                    return (
                        <label key={el[1]}>
                            {el[0]}
                            <input type="radio" 
                                   onChange={speed.onChange}
                                   checked={(speed.value || speed.initialValue) == el[1]}
                                   name="speed" 
                                   value={el[1]} />
                        </label>
                    );
                })}
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default reduxForm({
  form: 'dealerSpeed',
  fields
})(DealerSpeedForm);