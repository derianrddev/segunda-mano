import Swal from 'sweetalert2'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebaseConfig';

export const startLoginEmailPassword = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password )
    .catch( e => {
      Swal.fire('Error', e.code.slice(5), 'error');
    });
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
  const auth = getAuth();
  createUserWithEmailAndPassword( auth, email, password )
    .then( async({ user }) => {
      await updateProfile( user, {
        displayName:name
      });
    })
    .catch( e => {
      Swal.fire('Error', e.code.slice(5), 'error');
    });
}

export const startGoogleLogin = () => {
  const auth = getAuth();
  signInWithPopup( auth, googleAuthProvider )
    .catch( e => {
      Swal.fire('Error', e.code.slice(5), 'error');
    });
}

export const startLogout = () => {
    const auth = getAuth();
    signOut(auth);
};