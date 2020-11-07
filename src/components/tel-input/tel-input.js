import React, { forwardRef } from "react";
import MaskedInput from "react-input-mask";
import { Controller } from "react-hook-form";

const CustomMaskedInput = forwardRef((props, ref) => {
    const { value, onChange, name } = props;
    return (
        <MaskedInput
            name={name}
            value={value}
            mask="+7 (999) 999-9999"
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

export default function TelInput({ name, errors, control }) {

    const [tel, setTel] = React.useState("");

    return (
        <Controller
            as={<CustomMaskedInput />}
            value={tel}
            onChange={([e]) => {
                setTel(e);
                return { value: e };
            }}
            rules={{
                required: "Необходимо указать телефон"
            }}
            defaultValue={tel}
            name={name}
            control={control}
        />
    );
}
