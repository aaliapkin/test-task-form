import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DateInput, { dateFieldToTimestamp } from '../date-input/';
import TelInput from '../tel-input/';

import './form.scss';

const Form = (props) => {
    const { handleSubmit, register, setError, clearErrors, errors, control } = useForm({ reValidateMode: 'onChange' });
    const [isSubmitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (values) => {
        if (!isSubmitting) {
            setSubmitting(true);
            const data = {
                id: 1,
                data: {
                    phone: values.phone.trim().replace(/\D/g, '').replace(/^7/g, '+7'),
                    date: dateFieldToTimestamp(values.date),
                    comment: values.comment
                }
            }

            fetch('https://cors-anywhere.herokuapp.com/https://interview.gazilla-lounge.ru/api/submit', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(response => response.json()
            ).then(data => handleResults(data)
            ).catch(() => {
                setError("submit", { type: "double_send", message: "Ошибка при обработке формы" })
                setTimeout(() => { clearErrors("submit") }, 3000);
            });

            await new Promise(resolve => {
                setTimeout(() => {
                    setSubmitting(false);
                    resolve();
                }, 5000);
            });
        }
    }

    function handleResults({ data: success }) {
        if (success) {
            setSuccess(true);
        } else {
            setError("submit", { type: "double_send", message: "Ошибка при обработке формы" })
            setTimeout(() => { clearErrors("submit") }, 3000);
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

                <ErrorMessage error={errors.date} />

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

                <ErrorMessage error={errors.comment} />

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

                <ErrorMessage error={errors.agree} />

                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Отправить заявку" disabled={isSubmitting} />
                </div>

                <ErrorMessage error={errors.submit} />

                <SuccessMessage success={success} />

            </form >
        </div >
    );
};

const ErrorMessage = ({ error }) => (error ?
    <div className="form-group call-form__error">
        {error.message}
    </div> :
    <React.Fragment>
    </React.Fragment>
);

const SuccessMessage = ({ success }) => (success ?
    <div className="form-group call-form__success">
        {'Заявка успешно создана'}
    </div> :
    <React.Fragment>
    </React.Fragment>
);

export default Form;
