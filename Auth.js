// AuthContext.js

import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: true, // should be true to show loading while restoring token
};

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...state, ...action.payload, loading: false };
    case 'SIGN_IN':
      return { ...state, ...action.payload, loading: false };
    case 'SIGN_OUT':
      return { ...initialState, loading: false };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Restore token on app load
    const bootstrapAsync = async () => {
      let accessToken, refreshToken;
      try {
        accessToken = await AsyncStorage.getItem('accessToken');
        refreshToken = await AsyncStorage.getItem('refreshToken');
      } catch (e) {
        // Optionally log error
      }
      dispatch({
        type: 'RESTORE_TOKEN',
        payload: { accessToken, refreshToken, user: accessToken ? {} : null },
      });
    };
    bootstrapAsync();
  }, []);

  const signIn = async (username, password) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/auth/login', {
      username,
      password,
    });

    if (response.data.token) {
      await AsyncStorage.setItem('accessToken', response.data.token);
      dispatch({
        type: 'SIGN_IN',
        payload: {
          accessToken: response.data.token,
          user: { username },
          refreshToken: null,
        },
      });
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};


  const signUp = async (email, password) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/users', {
        email,
        username: email,
        password,
        name: { firstname: "First", lastname: "Last" },
        address: { city: "city", street: "street", number: 1, zipcode: "12345", geolocation: { lat: "0", long: "0" } },
        phone: "123-456-7890"
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    dispatch({ type: 'SIGN_OUT' });
  };

  // Add refresh token logic as needed

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
