// src/App.tsx
import React from 'react';
import { registerRootComponent } from 'expo';
import CalculatorScreen from './screens/CalculatorScreen';

function App() {
  return <CalculatorScreen />;
}

registerRootComponent(App);
