import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


function SimpleForm({ onClose }) {
  const {register, handleSubmit, setError, formState: { errors }} = useForm();

  const [submit, setSubmit] = useState(false);
  const [visible, setVisible] = useState(false);

  const onSubmit = (data) => {
    const isValid = validateData(data);

    if (isValid) {
      console.log('Your Login Info:', data);
      setSubmit(true);
    }
  };

  const validateData = (data) => {

    if (data.firstName.length < 3 || data.firstName.length > 30) {
      setError('firstName', {
        type: 'manual',
        message: 'Name should be between 3 and 30 characters',
      });
      return false;
    }

    if (data.lastName.length < 3 || data.lastName.length > 30) {
      setError('lastName', {
        type: 'manual',
        message: 'Name should be between 3 and 30 characters',
      });
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      setError('email', {
        type: 'manual',
        message: 'Invalid email address',
      });
      return false;
    }

    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (data.password.length < 10 || !specialCharacterPattern.test(data.password)) {
      setError('password', {
        type: 'manual',
        message: 'Password must be at least 10 characters long with at least one special character',
      });
      return false;
    }

    if (data.repeatPassword !== data.password) {
      setError('repeatPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return false;
    }

    return true;
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>Kalvium Book Form</h1>
        <p className="close-btn" onClick={onClose}>&times;</p>
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            {submit ? <div className="success"><h2>Registration Successful</h2></div> : null}

            <div className='flexbox'>
              <input className='InputBox'
                type="text"
                placeholder="firstName"
                {...register('firstName', {
                  required: 'First name is required!',
                })}
              />
              <span>{errors.firstName && errors.firstName.message}</span>
            </div>

            <div className='flexbox'>
              <input  className='InputBox'
                type="text"
                placeholder="lastName"
                {...register('lastName', {
                  required: 'Last name is required!',
                })}
              />
              <span>{errors.lastName && errors.lastName.message}</span>
            </div>

            <div className='flexbox'>
              <input className='InputBox'
                type="text"
                placeholder="email"
                {...register('email', {
                  required: 'Email is required!',
                })}
              />
              <span>{errors.email?.message}</span>
            </div>

            <div className="flexbox password">
              <input className='InputBox'
                type={visible ? 'text' : 'password'}
                placeholder="Password"
                onClick={setVisible}
                {...register('password', {
                  required: 'Password is required!',
                })}
              />
              <span>{errors.password?.message}</span>
            </div>

            <div className="flexbox password">
              <input className='InputBox'
                type={visible ? 'text' : 'password'}
                placeholder="Repeat Password"
                {...register('repeatPassword', {
                  required: 'Repeat Password is required!',
                })}
              />
              <span>{errors.repeatPassword?.message}</span>
            </div>
            <button className="submit" type="submit" disabled={submit}> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SimpleForm;
