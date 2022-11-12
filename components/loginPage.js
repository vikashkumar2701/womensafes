import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Header from "./header";

export default function LoginPage({navigation}) {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  function sendOTP() {
    console.log("Send OTP");
    setIsOTPSent(true);
    console.log("isOTPSent", isOTPSent);
  }
  function verifyOTP() {
    console.log("Verify OTP");
  }

  return (
    <SafeAreaView>
   
  
   
    <View style={styles.white}>
      <Header />

    <View>
    {isOTPSent===false ? (
        <>
      
      <View style={styles.input}>
        <TextInput
          
          placeholder="Enter your mobile number"
        ></TextInput>
      </View>
        <Pressable onPress={sendOTP}>
        <View style={styles.Button}>
          <Text style={styles.TextInput}>Send OTP</Text>
        </View>
        </Pressable>
        </>
      ) : (
        <>

        <View>
        <TextInput style={styles.input} placeholder="Enter OTP"></TextInput>
      </View>
      <Pressable onPress={() =>
        navigation.navigate('Dashboard', { name: 'Dashboard' })}>
        <View style={styles.Button}>
          <Text style={styles.TextInput}>Validate OTP and Login</Text>
        </View>
        </Pressable>
        <Pressable onPress={() => setIsOTPSent(false) }>
        <View style={styles.Button}>
          <Text style={styles.TextInput}>Change Phone Number</Text>
        </View>
        </Pressable>
        </>
      )}
   </View>
   </View>
   </SafeAreaView>
  );

};
const styles = StyleSheet.create({

  //maersk blue input
  input: {
    backgroundColor: '#fff',
    height: 50,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#42B0D5',
    
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    elevation: 50,
  },
  white: {
    backgroundColor: "white",
  },
  header: {

    backgroundColor: '#42B0D5',
    height: 100,
    elevation: 50

  },
  title: {
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center', 
    width: "100%",
    height: "100%",
    
  
  },
  Button: {
    backgroundColor: '#42B0D5',
    height: 50,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#42B0D5',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    elevation: 50,
  },
  TextInput: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: "100%",
    height: "100%",
  },


});