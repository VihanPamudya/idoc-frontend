import React from 'react';


const Layout = ({ children } : { children: JSX.Element }) =>{

    return(
        <div className='container login-wrapper'>
            <div className='login-logo'>
                <img src="/images/logo.png" alt="logo" />
            </div>

            <div className='login-container row'>
                <div className='col-5'>
                    <img src="/images/login-img.png" alt="logo" />
                </div>

                <div className='col-md-6 offset-md-1 login-sub-container'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;