import React from 'react'
import { Link } from 'react-router-dom';
import { startRegisterWithEmailPasswordName } from '../../helpers/auth';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

  const [shown, setShown] = React.useState(false);

  const [ formValues, handleInputChange ] = useForm({
    name: 'Derian',
    email: '123@gmail.com',
    password: '12345678',
    password2: '12345678'
  });

  const { name, email, password, password2 } = formValues;

  const switchShown = () => setShown(!shown);

  const handleRegister = (e) => {
    e.preventDefault();
    
    startRegisterWithEmailPasswordName(email, password, name);
  }

  return (
    <div className='content-login'>
      <main className='container auth__container'>
        <h1 className='auth__title'>Regístrate</h1>
        <p className='auth__account'>O <Link to="/auth/login" className='auth__account--link'>ya tengo una cuenta</Link></p>
        <form className='auth-form' onSubmit={ handleRegister }>
          <div className='auth-form__input-wrapper'>
            <input 
              className='auth-form__input' 
              type="text" 
              name='name'
              placeholder='Nombre'
              value={ name }
              onChange={ handleInputChange }
            />
            <i className="fa-solid fa-user auth-form__input-icon"></i>
          </div>
          <div className='auth-form__input-wrapper'>
            <input 
              className='auth-form__input' 
              type="text" 
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
          <div className='auth-form__input-wrapper'>
            <input 
              className='auth-form__input'
              type={ shown ? 'text' : 'password' } 
              name='password2' 
              placeholder='Confirmar contraseña'
              value={ password2 }
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
            Crear Cuenta
          </button>
        </form>
      </main>
    </div>
  )
}
