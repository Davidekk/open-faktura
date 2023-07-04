import React from 'react';

function FormTextarea({type,name,value,handleChange,labelText, style}) {
    return (
        <div>
            <label htmlFor={name} className="form-label"> {labelText || name} </label>
            <textarea className={"form-textarea"} value={value}
                   onChange={handleChange} name={name}/>
        </div>
    );
}

export default FormTextarea;