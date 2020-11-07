import React from 'react';
import InputMask from 'react-input-mask';

class Input extends React.Component {
    state = {
        value: ''
    }

    onChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    beforeMaskedValueChange = (newState, oldState, userInput) => {
        console.log('fire');
        var { value } = newState;
        var selection = newState.selection;
        var cursorPosition = selection ? selection.start : null;

        // keep minus if entered by user
        if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
            if (cursorPosition === value.length) {
                cursorPosition--;
                selection = { start: cursorPosition, end: cursorPosition };
            }
            value = value.slice(0, -1);
        }

        return {
            value,
            selection
        };
    }

    render() {
        return (
            <div>
                <InputMask mask="99999-9999" maskChar={null} value={this.state.value} onChange={this.onChange} beforeMaskedValueChange={this.beforeMaskedValueChange} />
            </div>);
    }
}

export default Input;