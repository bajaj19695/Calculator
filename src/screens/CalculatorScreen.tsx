import React, { useState } from 'react';
import {
  View,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  Button,
  Switch,
  DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const buttons = [
  ['C', '(', ')', '⌫'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '−'],
  ['.', '0', '=', '+'],
];

// Utility function to check if a value is an operator
const isOperator = (val: string) => ['+', '−', '×', '÷'].includes(val);

export default function CalculatorScreen() {
  const systemTheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemTheme === 'dark');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (val: string) => {
    if (val === 'C') {
      setExpression('');
      setResult('');
    } else if (val === '⌫') {
      setExpression(expression.slice(0, -1));
    } else if (val === '=') {
      try {
        const sanitized = expression
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/−/g, '-');
        // Prevent eval on empty or invalid expressions
        if (!sanitized || /[+\-*/.]$/.test(sanitized)) {
          setResult('Error');
          return;
        }
        // eslint-disable-next-line no-eval
        const evalResult = eval(sanitized);
        setResult(evalResult.toString());
      } catch (e) {
        setResult('Error');
      }
    } else {
      // Prevent starting with operator (except minus for negative numbers)
      if (
        expression === '' &&
        (isOperator(val) && val !== '−')
      ) {
        return;
      }
      // Prevent consecutive operators
      if (
        isOperator(val) &&
        isOperator(expression.slice(-1))
      ) {
        setExpression(expression.slice(0, -1) + val);
        return;
      }
      setExpression((prev) => prev + val);
    }
  };

  const theme = darkMode ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.colors.background, padding: 16 }}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: theme.colors.onSurface }}>
                {darkMode ? 'Dark' : 'Light'} Theme
              </Text>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 24, textAlign: 'right', color: theme.colors.onSurface }}>
              {expression}
            </Text>
            <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'right', color: theme.colors.onSurface, marginTop: 10 }}>
              {result}
            </Text>
            
          </View>

          <View style={{ flex: 2, justifyContent: 'flex-end' }}>
            {buttons.map((row, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {row.map((item) => (
                  <Button
                    key={item}
                    mode="contained"
                    onPress={() => handleInput(item)}
                    style={{
                      flex: 1,
                      margin: 5,
                      borderRadius: 50,
                      backgroundColor:
                        item === 'C'
                          ? '#fbc531'
                          : item === '='
                          ? '#8e44ad'
                          : ['÷', '×', '−', '+'].includes(item)
                          ? '#9c88ff'
                          : darkMode
                          ? '#2f3640'
                          : '#ecf0f1',
                    }}
                    labelStyle={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color:
                        item === '=' || item === 'C' || ['÷', '×', '−', '+'].includes(item)
                          ? '#fff'
                          : darkMode
                          ? '#dcdde1'
                          : '#2f3640',
                    }}
                    contentStyle={{ height: 60, justifyContent: 'center' }}
                  >
                    {item === '⌫' ? <Icon name="backspace-outline" size={22} color={darkMode ? "#fff" : "#000"} /> : item}
                  </Button>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
