import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button, Backdrop, CircularProgress } from '@mui/material';
import GoogleImg from '../../assets/images/google.png';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../../firebase';
import { MyContext } from '../../App';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormFields(() => ({
      ...formFields,
      [name]: value,
    }));
  };

  const signIn = () => {
    if (formFields.email !== "" && formFields.password !== "") {
      setShowLoader(true);
      signInWithEmailAndPassword(auth, formFields.email, formFields.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setShowLoader(false);
          setFormFields({
            email: '',
            password: '',
          });
          localStorage.setItem('isLogin', true);
          context.signIn();
          navigate('/');
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
          setShowLoader(false);
        });
    } else {
      alert("Please fill all the details");
    }
  };

  const signInWithGoogle = () => {
    setShowLoader(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setShowLoader(false);
        localStorage.setItem('isLogin', true);
        context.signIn();
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        setShowLoader(false);
      });
  };

  return (
    <section className='signIn mb-5'>
      <div className="breadcrumbWrapper">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li><Link to="/">Home</Link></li>
            <li>Sign In</li>
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
          <h3>Sign In</h3>
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
            <div className='form-group mt-5 mb-4 w-100'>
              <Button className='btn btn-g btn-lg w-100' onClick={signIn}>Sign In</Button>
            </div>
            <div className='form-group mt-5 mb-4 w-100 signInOr'>
              <p className='text-center'>OR</p>
              <Button className='w-100' variant="outlined" onClick={signInWithGoogle}>
                <img src={GoogleImg} alt="Google" />
                Sign In with Google
              </Button>
            </div>
            <p className='text-center'>Not have an account
              <b><Link to="/signup">Sign Up</Link></b>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
