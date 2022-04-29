import React from 'react';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../helpers/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

  const [shown, setShown] = React.useState(false);

  const [ formValues, handleInputChange ] = useForm({
    email: '123@gmail.com',
    password: '12345678'
  });

  const { email, password } = formValues;

  const switchShown = () => setShown(!shown);

  const handleLogin = (e) => {
    e.preventDefault();

    startLoginEmailPassword( email, password );
  }

  const handleGoogleLogin = () => {
    startGoogleLogin();
  }

  return (
    <div className='content-login'>
      <main className='container auth__container'>
        <h1 className='auth__title'>Login</h1>
        <p className='auth__account'>O <Link to="/auth/register" className='auth__account--link'>crea una cuenta</Link></p>
        <form className='auth-form' onSubmit={ handleLogin }>
          <div className='auth-form__input-wrapper'>
            <input
              className='auth-form__input' 
              type="email" 
              name='email'
              placeholder='Dirección de correo electrónico' 
              value={ email }
              onChange={ handleInputChange }
            />
            <i className="fa-solid fa-envelope auth-form__input-icon"></i>
          </div>
          <div className='auth-form__input-wrapper'>
            <input 
              className='auth-form__input' 
              type={ shown ? 'text' : 'password' } 
              name='password'
              placeholder='Contraseña'
              value={ password }
              onChange={ handleInputChange }
            />
            <i className="fa-solid fa-key auth-form__input-icon"></i>
            {
              shown 
              ? <i 
                  className="fa-solid fa-eye auth-form__input-icon auth-form__input-icon--password" 
                  onClick={switchShown}
                ></i>
              : <i 
                  className="fa-solid fa-eye-slash auth-form__input-icon auth-form__input-icon--password" 
                  onClick={switchShown}
                ></i>
            }
          </div>
          <button className='auth-form__button auth-form__button--auth' type="submit" >
            Inicia Sesión
          </button>
          <p className='auth-form__forget-password'>¿Has olvidado tu contraseña?</p>
          <h2>Inicia sesión en tu cuenta desde</h2>
          <div className="auth-form__button auth-form__button--google" onClick={ handleGoogleLogin }>
            <div className="auth-form__google-icon-wrapper">
              <img className="auth-form__google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="auth-form__btn-text">Google</p>
          </div>
        </form>
      </main>
    </div>
  )
}
