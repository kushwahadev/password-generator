/* eslint-disable semi */
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { Formik } from 'formik';


// form validation
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4,'Should be min of 4 characters')
  .max(16,'Should be max of 16 characters')
  .required('Length is required'),
});


export default function App() {
// using useState
  const [password , setPassword] = useState('');
  const [ispassGenerated , setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const generatePasswordString  = (passwordLength: number) =>{
    let characterList = ''
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if(lowerCase){
      characterList += lowerCaseChars;
    }

    if(upperCase){
      characterList += upperCaseChars;
    }

    if(numbers){
      characterList += digitChars;
    }

    if(symbol){
      characterList += specialChars;
    }
    // call function to genrate password string
    const passwordResult = createPassword(characterList,passwordLength)

    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  // generate password string
  const createPassword = (characters :string, passwordLength: number) => {
    let result = ''

    for (let i = 0; i < passwordLength; i++) {
      result += characters[Math.round(Math.random() * characters.length)];
    }
    return result;
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbol(false)
  }


  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.appBody}>
      <SafeAreaView style={styles.appContainer}>
      <View style={styles.formContainer}>
      <Text style={styles.headingText}>We are Building a Password Generator</Text>
      <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={values => {
        console.log(values);
        generatePasswordString(Number(values.passwordLength)) //TODO
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
        <>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>{errors.passwordLength}</Text>
            )}
          </View>
            <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 8"
            keyboardType="numeric"
            />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox
          disableText
          isChecked={lowerCase}
          onPress={() => setLowerCase(!lowerCase)}
          fillColor="#29ABB7"

          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include uppercase</Text>
          <BouncyCheckbox
          disableText
          isChecked={upperCase}
          onPress={() => setUpperCase(!upperCase)}
          fillColor="#f90050"

          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include numbers</Text>
          <BouncyCheckbox
          disableText
          isChecked={numbers}
          onPress={() => setNumbers(!numbers)}
          fillColor="#fedc57"

          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include symbol</Text>
          <BouncyCheckbox
          disableText
          isChecked={symbol}
          onPress={() => setSymbol(!symbol)}
          fillColor="#5c65c0"

          />
        </View>


        <View style={styles.formActions}>
        <TouchableOpacity disabled={!isValid} style={styles.primaryBtn} onPress={handleSubmit}

        >
          <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
        <TouchableOpacity  style={styles.secondaryBtn} onPress={() => {handleReset(); resetPasswordState()}}>
          <Text style={styles.secondaryBtnTxt}>Reset</Text>
        </TouchableOpacity>
        </View>
        </>
       )}
     </Formik>
      </View>
      {ispassGenerated ? (
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.subTitle}>Result : </Text>
          <Text style={styles.description}>Long Press to copy</Text>
          <Text selectable={true} style={styles.generatedPassword}>{password}</Text>

        </View>
      ) : null}

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headingText:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:'#7b3b3b',
    padding:6,
    marginVertical:4,
    borderRadius:6,

  },
  appBody:{
    backgroundColor:'#161616',
    height:1000,

  },
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#c93e4f',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000',
  },
});
