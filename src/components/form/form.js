import React, { Component } from 'react';
import './form.scss';

export class Form extends Component {

    state = {
        phone: '',
        date: 0,
        comment: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    onPhoneChange = (e) => {
        this.setState({
            phone: e.target.value
        });
    }

    onDateChange = (e) => {
        this.setState({
            date: e.target.value
        });
    }

    onCommentChange = (e) => {
        this.setState({
            comment: e.target.value
        });
    }

    componentDidMount() {
        let now = new Date();
        let defaultTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0,
            0
        );
        console.log(defaultTime);
    }

    render() {

        return (
            <div className="call-form__wrapper mx-auto container">
                <form onSubmit={this.onSubmit} className="call-form">

                    <div className="form-group">
                        <label htmlFor="call-form__phone">Номер телефона</label>
                        <input
                            id="call-form__phone"
                            type="text"
                            onChange={this.onPhoneChange}
                            className="form-control" />
                    </div>


                    <div className="form-group">
                        <label htmlFor="call-form__time">Дата и время обратного звонка</label>
                        <input
                            id="call-form__time"
                            type="text"
                            onChange={this.onDateChange}
                            className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="call-form__comment">Комментарий к заявке</label>
                        <textarea
                            name="call-form__comment"
                            id="call-form__comment"
                            onChange={this.onCommentChange}
                            className="form-control"></textarea>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input id="call-form__agree" type="checkbox" className="checkbox" />
                            </div>
                        </div>
                        <label htmlFor="call-form__agree" className="form-control">Согласен с предоставлением услуги</label>
                    </div>

                    <input type="submit" className="btn btn-primary" value="Отправить заявку" />
                </form >
            </div >
        )
    }
};

export default Form;
