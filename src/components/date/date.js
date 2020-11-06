import React, { Component } from 'react';

class DateInput extends Component {

    state = new Date();

    onChange = e => {
        e.preventDefault();
        let v = e.target.value;
        v = new Date();
        this.setState({ v });
    }

    formatDate(d) {
        return (d.getFullYear() + '.' + d.getFullYear());
    }

    render() {

        return (
            <input type="text" value={this.formatDate(this.state)} onChange={this.onChange} />
        );
    }
};

export default DateInput;
