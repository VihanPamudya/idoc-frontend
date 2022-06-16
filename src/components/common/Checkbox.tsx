import React from 'react';

const Checkbox = (
    {
        onChange,
        name,
        label,
        checked
    } : {
        onChange: any,
        name: string,
        label?: string,
        checked?: boolean
    }) => {

    return (
        <div className="form-check">
            { label && <label htmlFor={ name } >{ label }</label> }
            <input
                type='checkbox'
                name= { name }
                id={ name }
                onChange={ onChange }
                className= 'form-check-input checkbox-1'
                checked = {checked}
            />
        </div>
    );
};

export default Checkbox;