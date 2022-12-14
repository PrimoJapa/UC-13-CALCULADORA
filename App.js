import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "*", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '='];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');


  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const fistNumber = parseFloat(splitNumbers[0]);
    const lastNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];
    const OperatorPorcentagem = splitNumbers[3];
    
    // Faz ação referente tecla pressionada
    switch (operator) {
      case '+':
        if (OperatorPorcentagem === '%') {
          setCurrentNumber((fistNumber * lastNumber) / 100 + fistNumber);
        } else {
          setCurrentNumber((fistNumber + lastNumber).toString());
        }
        return;
      case '-':
        if (OperatorPorcentagem === '%') {
          setCurrentNumber(fistNumber - (fistNumber * lastNumber) / 100);
        } else {
          setCurrentNumber((fistNumber - lastNumber).toString());
        } 
        return;
      case '*':
        if (OperatorPorcentagem === '%') {
          setCurrentNumber((lastNumber / 100) * fistNumber);
        } else {
          setCurrentNumber((fistNumber * lastNumber).toString());
        }
        return;
      case '/': 
        setCurrentNumber((fistNumber / lastNumber).toString())
        return;
    }
  }

  function handleInput(buttonPressed){
    console.log(buttonPressed) // Mostra no Console a tecla pressionada
    if(
      buttonPressed === '+' || 
      buttonPressed === '-' || 
      buttonPressed === '*' || 
      buttonPressed === '/' 
    ) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }
    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)));
        return;
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calculator();
        return;
      case '+/-':
        if (currentNumber >= 0) {
          setCurrentNumber('-' + currentNumber);
        } else {
          setCurrentNumber((currentNumber) * (0-1));
        }
        return;
      case '%':
        setCurrentNumber(currentNumber + ' ' + buttonPressed);
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View style={styles.container}>
      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
          <Text style={styles.historyText}>{lastNumber}</Text>
          <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
        <View>
          {/* Area onde os botões são exibidos*/}
          <View style={styles.buttons}>
            {buttons.map((button) => 
              button === '=' ? // Mapeamento do botão =
            <TouchableOpacity 
              onPress={() => handleInput(button)} 
              key={button} 
              style={[styles.button, {backgroundColor: '#1E1240'}]}
            >
              <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>
                {button}
              </Text>
            </TouchableOpacity>
            :// Mapeamento dos outros botões
            <TouchableOpacity 
              onPress={() => handleInput(button)} 
              key={button} 
              style={styles.button}
            >
                <Text style={[styles.textButton, {color: typeof button === 'number' ? '#FBF9FC' : '#808080'}]}>
                  {button}
                </Text>
            </TouchableOpacity>
            )}
          </View>
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#1E1240',
  },
  resultText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    color: '#7B7B7B',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#3D0075',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 104,
    flex: 2,
  },
  textButton: {
    color: '#7c7c7c',
    fontSize: 25,
  },
});