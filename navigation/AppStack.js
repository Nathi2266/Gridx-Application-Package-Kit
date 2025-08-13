// navigation/AppStack.js
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import HomeTabs from '../screens/HomeTabs';
import { AuthContext } from '../contexts/AuthContext';
import FaultDetailsPage from '../screens/FaultDetailsPage';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={HomeTabs} />
          <Stack.Screen name="FaultDetails" component={FaultDetailsPage} />
          <Stack.Screen name="Success" component={SuccessScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
