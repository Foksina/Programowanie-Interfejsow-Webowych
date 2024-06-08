import React, { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../Data/init';
import { db } from '../Data/init'; 
import { doc, setDoc, getDoc } from 'firebase/firestore'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null); 
  

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); 
        });

        return () => unsubscribe();
    }, []);

    const addUserToFirestore = async (user) => {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
  
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          uid: user.uid,
        });
      }
    };

    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        await addUserToFirestore(result.user);
      } catch (error) {
        console.error("Google login error: ", error);
        setError('Google login error');
      }
    };

    const handleEmailLogin = async () => {
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          await addUserToFirestore(result.user);
        } catch (error) {
          console.error("Email login error: ", error);
          setError('Email login error');
        }
      };

    const handleEmailRegister = async () => {
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          await addUserToFirestore(result.user);
        } catch (error) {
            console.error("Email registration error: ", error);
            setError('Email registration error');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
          <p 
            style={{
              marginBottom: '120px',
            }}
          >
            Login
          </p>
          <p 
            style={{
              fontSize: '32px',
              fontFamily: 'Arial',
              color: '#50614A',
              marginBottom: '20px',
            }}
          >
            Login
          </p>
          
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ margin: '10px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ margin: '10px' }}
          />
          <button 
            style={{
              padding: '10px 20px',
              backgroundColor: '#C4E641',
              color: '#50614A',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              outline: 'none',
              marginRight: '10px',
            }} 
            onClick={handleEmailLogin}
          >
            Log in with Email/Password
          </button>
          <button 
            style={{
              padding: '10px 20px',
              backgroundColor: '#C4E641',
              color: '#50614A',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              outline: 'none',
              marginRight: '10px',
            }} 
            onClick={handleEmailLogin}
          >
            Register with Email/Password
          </button>
          <button 
            style={{
              padding: '10px 20px',
              backgroundColor: '#C4E641',
              color: '#50614A',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              outline: 'none',
            }} 
            onClick={handleGoogleLogin}
          >
            Log in with Google
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          {user ? <p>Zalogowano jako: {user.email}</p> : <p>Nie jesteś zalogowany</p>}

        </div>
      );
    }
    
export default Login;