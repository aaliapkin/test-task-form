import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DateInput, { dateFieldToTimestamp } from '../date-input/';
import TelInput from '../tel-input/';

import './form.scss';

const Form = (props) => {
    const { handleSubmit, register, errors, control } = useForm({ reValidateMode: 'onChange' });
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = async (values) => {
        if (!isSubmitting) {
            setSubmitting(true);
            values.date = dateFieldToTimestamp(values.date);
            values.phone = values.phone.trim().replace(/\D/g, '').replace(/^7/g, '+7');
            console.log(values);
            await new Promise(resolve => {
                setTimeout(() => {
                    setSubmitting(false);
                    resolve();
                }, 2000);
            });
        }
    }

    return (
        <div className="call-form__wrapper mx-auto container">
            <form onSubmit={handleSubmit(onSubmit)} className="call-form" disabled={isSubmitting}>

                <div className="form-group">
                    <label htmlFor="phone">Номер телефона</label>
                    <TelInput name="phone" errors={errors} control={control} />
                </div>

                {errors.phone ? <ErrorMessage message={errors.phone.message} /> : ''}

                <div className="form-group">
                    <label htmlFor="date">Дата и время обратного звонка</label>
                    <DateInput name="date" errors={errors} control={control} />
                </div>

                {errors.date ? <ErrorMessage message={errors.date.message} /> : ''}

                <div className="form-group">
                    <label htmlFor="comment">Комментарий к заявке</label>
                    <textarea
                        name="comment"
                        id="comment"
                        maxLength="1024"
                        rows="6"
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

                <input type="submit" className="btn btn-primary" value="Отправить заявку" disabled={isSubmitting} />
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
