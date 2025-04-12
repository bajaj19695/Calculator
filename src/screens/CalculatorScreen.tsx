import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CalculatorScreen = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value: string) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', ''],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.input}>{input}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={styles.button}
                onPress={() => handlePress(button)}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  display: {
    flex: 2,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  input: {
    fontSize: 30,
    color: '#fff',
  },
  result: {
    fontSize: 40,
    color: '#0f0',
    marginTop: 10,
  },
  buttons: {
    flex: 5,
    backgroundColor: '#fff',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    height: 60,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
  },
});

export default CalculatorScreen;