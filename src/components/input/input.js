import React from "react";

const Input = React.memo(({ type, name, id, value, onChange, placeholder, style, className }) => {

    return (
        <input type={type} name={name} id={id} placeholder={placeholder} value={value} onChange={onChange} style={style} className={className ? className : undefined} />
    );
});

export default Input;