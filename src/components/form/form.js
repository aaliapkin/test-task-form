import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MaskedInput from 'react-input-mask';

import './form.scss';

const Form = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = (values) => {
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

    const [dateField, setDateField] = useState(formatDate(defaultDate()));
    const [phoneField, setPhoneField] = useState("");

    return (
        <div className="call-form__wrapper mx-auto container">
            <form onSubmit={handleSubmit(onSubmit)} className="call-form">

                <div className="form-group">
                    <label htmlFor="phone">Номер телефона</label>
                    <MaskedInput
                        name="phone"
                        mask="+7 (999) 999-9999"
                        value={phoneField}
                        onChange={(e) => setPhoneField(e.target.value)}
                        alwaysShowMask>
                        {(inputProps) => {
                            console.log(inputProps.date);
                            return (
                                <input
                                    id="phone"
                                    value={inputProps.phone}
                                    name={inputProps.name}
                                    ref={
                                        register({
                                            required: "Необходимо заполнить дату",
                                            pattern: {
                                                value: /^(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})$/gm,
                                                message: "Неверный формат даты"
                                            }
                                        })
                                    }
                                    className="form-control" />
                            )
                        }}
                    </MaskedInput>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        ref={
                            register({
                                required: "Необходимо указать телефон",
                                pattern: {
                                    value: /^\s*(\+7|8)\s*\(?\d{3}\)?\s*\d{3}[\s-]*\d{2}[\s-]*\d{2}\s*$/gm,
                                    message: "Неверный формат номера телефона"
                                }
                            })
                        }
                        className="form-control" />
                </div>

                {errors.phone ? <ErrorMessage message={errors.phone.message} /> : ''}

                <div className="form-group">
                    <label htmlFor="date">Дата и время обратного звонка</label>

                    <MaskedInput
                        name="date"
                        mask="99.99.9999 99:99"
                        value={dateField}
                        onChange={(e) => setDateField(e.target.value)}
                        alwaysShowMask>
                        {(inputProps) => {
                            console.log(inputProps.date);
                            return (
                                <input
                                    id="date"
                                    value={inputProps.date}
                                    name={inputProps.name}
                                    ref={
                                        register({
                                            required: "Необходимо заполнить дату",
                                            pattern: {
                                                value: /^(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})$/gm,
                                                message: "Неверный формат даты"
                                            }
                                        })
                                    }
                                    className="form-control" />
                            )
                        }}
                    </MaskedInput>
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
