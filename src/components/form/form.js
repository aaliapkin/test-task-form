import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import './form.scss';

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm({ reValidateMode: 'onChange' });

    const onSubmit = (values) => {
        console.log(values);
        values.phone = values.phone.trim().replace(/\D/g, '').replace(/(^8|^7)/g, '+7');
    }

    function formatDate(d) {
        const date = new Date(d);
        return ("0" + (date.getDate())).slice(-2) + "." +
            ("0" + (date.getMonth() + 1)).slice(-2) + "." +
            date.getFullYear() + " " +
            ("0" + (date.getHours())).slice(-2) + ":" +
            ("0" + (date.getMinutes())).slice(-2);
    }

    function defaultDate() {
        const date = new Date(Date.now());
        const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0);
        return tomorrow.getTime();
    }

    function validateDate(value) {
        console.log('validation', value);
        const res = value.match(/^(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})$/);
        if (res === null) {
            return false;
        }
        const [, d, mo, y, h, mi] = res;
        const timestamp = Date.parse(`${y}-${mo}-${d}T${h}:${mi}`);
        if (isNaN(timestamp)) {
            return false;
        }
        const today = new Date(Date.now());
        const date = new Date(timestamp);
        if (date.getTime() < today.getTime()) {
            return false;
        }
        return true;
    }


    const [dateField, setDateField] = useState(formatDate(defaultDate()));
    const [phoneField, setPhoneField] = useState("+7 (916) 426-5709");


    const beforeMaskedValueChange = (newState, oldState, userInput) => {
        var { value } = newState;
        var selection = newState.selection;
        console.log(userInput);
        return {
            value,
            selection
        };
    }

    return (
        <div className="call-form__wrapper mx-auto container">
            <form onSubmit={handleSubmit(onSubmit)} className="call-form">

                <div className="form-group">
                    <label htmlFor="phone">Номер телефона</label>

                    <InputMask
                        name="phone"
                        mask="+7 (999) 999-9999"
                        value={phoneField}
                        onChange={(e) => setPhoneField(e.target.value)}
                        alwaysShowMask
                        beforeMaskedValueChange={beforeMaskedValueChange}>
                        {(inputProps) => {
                            return (
                                <input
                                    id="phone"
                                    type="tel"
                                    name={inputProps.name}
                                    ref={
                                        register({
                                            required: "Необходимо указать телефон"
                                        })
                                    }
                                    className="form-control" />
                            )
                        }}
                    </InputMask>
                </div>

                {errors.phone ? <ErrorMessage message={errors.phone.message} /> : ''}

                <div className="form-group">
                    <label htmlFor="date">Дата и время обратного звонка</label>

                    <InputMask
                        name="date"
                        mask="99.99.9999 99:99"
                        value={dateField}
                        onChange={(e) => setDateField(e.target.value)}
                        alwaysShowMask
                        beforeMaskedValueChange={beforeMaskedValueChange}>
                        {(inputProps) => {
                            return (
                                <input
                                    type="text"
                                    name={inputProps.name}
                                    ref={
                                        register({
                                            required: "Необходимо заполнить дату",
                                            validate: (value) => validateDate(value) || 'Неверная дата'
                                        })
                                    }
                                    className="form-control" />
                            )
                        }}
                    </InputMask>
                </div>

                {errors.date ? <ErrorMessage message={errors.date.message} /> : ''}

                <div className="form-group">
                    <label htmlFor="comment">Комментарий к заявке</label>
                    <textarea
                        name="comment"
                        id="comment"
                        ref={register({
                            maxLength: {
                                value: 1024,
                                message: "Слишком длинный текст"
                            }
                        })}
                        className="form-control"></textarea>
                </div>

                {errors.comment ? <ErrorMessage message={errors.comment.message} /> : ''}

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input
                                id="agree"
                                name="agree"
                                type="checkbox"
                                className="checkbox"
                                ref={register({
                                    required: "Необходимо согласиться с предоставлением услуги"
                                })} />
                        </div>
                    </div>
                    <label htmlFor="agree" className="form-control">Согласен с предоставлением услуги</label>
                </div>

                {errors.agree ? <ErrorMessage message={errors.agree.message} /> : ''}

                <input type="submit" className="btn btn-primary" value="Отправить заявку" />
            </form >
        </div >
    );
};

const ErrorMessage = ({ message }) => {
    return (
        <div className="form-group call-form__error">
            {message}
        </div>
    );
}

export default Form;
