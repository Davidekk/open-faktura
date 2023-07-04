import React from 'react';

function FormRow({type, name, value, handleChange, labelText, style, display}) {
    return (<div className="form-row" style={style}>
            {!display ? <label htmlFor={name} className="form-label"> {labelText || name} </label> : ''}
            <input className={"form-input"} type={type} value={value}
                   onChange={handleChange} name={name}/>
        </div>);
}

export default FormRow;