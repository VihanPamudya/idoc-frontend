import React from 'react';

const Input = (
    {
        value,
        onChange,
        type,
        name,
        label,
        placeholder,
        required = false,
        style,
    } : {
        value: string | number,
        onChange: any,
        type: string,
        name: string,
        label?: string,
        placeholder: string
        required?: boolean,
        style?: any,
    }) => {

    return (
        <div className='d-flex align-items-center'>
            { label && <label style={{ marginRight:'50px'}} htmlFor={ name } >{ label }</label> }
            <input
                type= { type }
                name= { name }
                id={ name }
                placeholder={ placeholder }
                required={ required }
                value={ value }
                onChange={ onChange }
                className= 'form-control input-box-1'
                style={ style }
            />
        </div>
    );
};

export default Input;