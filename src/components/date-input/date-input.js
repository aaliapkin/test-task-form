import React, { forwardRef } from "react";
import MaskedInput from "react-input-mask";
import { Controller } from "react-hook-form";

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
    return formatDate(tomorrow.getTime());
}

function validateDate(value) {
    let timestamp = dateFieldToTimestamp(value);
    if (timestamp === undefined) {
        return 'Неверная дата';
    }
    const today = new Date(Date.now());
    const date = new Date(timestamp);
    if (date.getTime() < today.getTime()) {
        return 'Неверная дата';
    }
    return true;
}

export function dateFieldToTimestamp(value) {
    const res = value.match(/^(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})$/);
    if (res === null) {
        return undefined;
    }
    const [, d, mo, y, h, mi] = res;
    const timestamp = Date.parse(`${y}-${mo}-${d}T${h}:${mi}`);
    if (isNaN(timestamp)) {
        return undefined;
    }
    return timestamp;
}

const CustomMaskedInput = forwardRef((props, ref) => {
    const { value, onChange, name } = props;
    return (
        <MaskedInput
            name={name}
            value={value}
            mask="99.99.9999 99:99"
            maskPlaceholder={"_"}
            alwaysShowMask
            onChange={e => {
                e.persist();
                onChange(e.target.value);
            }}
        >
            {({ maskPlaceholder, ...inputProps }) => (
                <input type="text" name={inputProps.name} className="form-control" {...inputProps} />
            )}
        </MaskedInput>
    );
});

export default function DateInput({ name, errors, control }) {

    const [tel, setTel] = React.useState(defaultDate());

    return (
        <Controller
            as={<CustomMaskedInput />}
            value={tel}
            onChange={([e]) => {
                setTel(e);
                return { value: e };
            }}
            rules={{
                validate: {
                    inputTelRequired: v => validateDate(v)
                }
            }}
            defaultValue={tel}
            name={name}
            control={control}
        />
    );
}
