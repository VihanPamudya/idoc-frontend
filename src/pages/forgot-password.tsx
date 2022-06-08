import React, {ChangeEvent, useState} from 'react';
import { useDispatch } from 'react-redux';

import Layout from '../components/login/layout';
import Input from '../components/common/Input';
import {onChangeHandler} from '../utils/onChangeHandler';

import {sendForgotPasswordLink} from '../redux/actions/authActions';

const ForgotPassword = () =>{

    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        recoveryEmail: '',
    });

    const handleForgotPassword = (e:any) =>{
        e.preventDefault();
        dispatch(sendForgotPasswordLink(formState.recoveryEmail));
    };

    const handleOnChange=(e: ChangeEvent<HTMLInputElement> ) => {
        onChangeHandler({e, formState, setFormState});
    };

    return(
        <Layout>
            <>
                <div className='header-1 mb-5'>
                    <div>Forgot Password ? </div>
                </div>

                <form onSubmit={handleForgotPassword}>
                    <div>
                        <Input
                            value={formState.recoveryEmail}
                            onChange={ handleOnChange }
                            type='text'
                            name='recoveryEmail'
                            placeholder='Enter your ID'
                            required={ true }
                        />
                    </div>

                    <div className='mt-5 text-center'>
                        <button type='submit' className='btn button-1'>
                        Send Recovery Link
                        </button>
                    </div>
                </form>
            </>
        </Layout>
    );
};

export default ForgotPassword;