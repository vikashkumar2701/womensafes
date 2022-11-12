/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import LoginPage from './components/loginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Destination from './components/destination';
import FinalDelivery from './components/finalDelivery';
import Dashboard from './components/dashboard';


const App: () => Node = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
    
    <NavigationContainer>
 
  <Stack.Navigator>
       <Stack.Screen name="Home" component={LoginPage} />
       <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Capability" component={Destination} />
        <Stack.Screen name="FinalDelivery" component={FinalDelivery} />
     </Stack.Navigator>
  </NavigationContainer>
  </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
