// App.js

import React, { useContext } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // use this for web compatibility
import { AuthProvider } from './Auth';
import AuthContext from './Auth'; 
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './Profile';
import CartScreen from './cart';
import ProductDetailScreen from './Productd';
import SplashScreen from './SandB';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Products" component={ProductDetailScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  const { accessToken, loading } = useContext(AuthContext);

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken == null ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <Stack.Screen
          name="MainTab"
          component={MainTabs}
        />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
