import {ChangeEvent} from 'react';

export const onChangeHandler = (
    {
        e,
        formState,
        setFormState
    } : {
        e: ChangeEvent<HTMLInputElement>
        formState: any,
        setFormState: any
    }) =>{
    const { value, name, type } = e.target;

    if(type === 'checkbox'){
        setFormState({
            ...formState,
            [ name ] : !formState[name]
        });
    }
    else {
        setFormState({
            ...formState,
            [ name ] : value
        });
    }
};