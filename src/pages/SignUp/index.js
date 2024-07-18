import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button, Backdrop, CircularProgress } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase';

const auth = getAuth(app);

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChangeField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormFields(() => ({
            ...formFields,
            [name]: value,
        }));
    };

    const signUp = () => {
        if (formFields.email !== "" && formFields.password !== "" && formFields.confirmPassword !== "") {
            if (formFields.password === formFields.confirmPassword) {
                setShowLoader(true);
                createUserWithEmailAndPassword(auth, formFields.email, formFields.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        setShowLoader(false);
                        setFormFields({
                            email: '',
                            password: '',
                            confirmPassword: ''
                        });
                        alert("User created successfully");
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        alert(errorMessage);
                        setShowLoader(false);
                    });
            } else {
                alert("Passwords do not match");
            }
        } else {
            alert("Please fill all the details");
        }
    };

    return (
        <>
            <section className='signIn mb-5'>
                <div className="breadcrumbWrapper res-hide">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li><Link to="/">Home</Link></li>
                            <li>SignUp</li>
                        </ul>
                    </div>
                </div>
                <div className='loginWrapper'>
                    <div className='card shadow'>
                        <Backdrop
                            sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={showLoader}
                            className="formLoader"
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <h3>SignUp</h3>
                        <form className='mt-4'>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="email" type="email" name='email' label="Email" className='w-100' onChange={onChangeField} value={formFields.email} />
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="password" type={showPassword === false ? 'password' : 'text'} name='password' label="Password" className='w-100' onChange={onChangeField} value={formFields.password} />
                                    <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </Button>
                                </div>
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="confirmPassword" type={showPassword1 === false ? 'password' : 'text'} name='confirmPassword' label="Confirm Password" className='w-100' onChange={onChangeField} value={formFields.confirmPassword} />
                                    <Button className='icon' onClick={() => setShowPassword1(!showPassword1)}>
                                        {showPassword1 === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </Button>
                                </div>
                            </div>
                            <div className='form-group mt-5 mb-4 w-100'>
                                <Button className='btn btn-g btn-lg w-100' onClick={signUp}>Sign Up</Button>
                            </div>
                            <p className='text-center'>Already have an account
                                <b><Link to="/signIn">Sign In</Link></b>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
