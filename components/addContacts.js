import { useState } from 'react';
import {View, Text, StyleSheet, Button, TextInput, Pressable, Alert} from 'react-native';
import Header from './header';

export default function AddContacts({navigation}) {

    const [userName, setUserName] = useState('');
    const [number, setNumber] = useState('');

    function addContact() {
        console.log('add contact');
        console.log(userName);
    }
    function setusname(e) {
        
        setUserName(e);
        console.log(userName);
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: userName, number: number })
    };
  
    const postExample = async () => {
        try {
            await fetch(
                'https://eofq4zxnv5bg85o.m.pipedream.net', requestOptions)
                .then(response => {
                    console.log(response);

                })
        }
        catch (error) {
            console.error(error);
        }
    }
return (
<View style={styles.container}>
<Header />
<View style={styles.goodarea}>
<Text style={styles.header}>Add Emergency Contacts</Text>
<TextInput style={styles.TextInput} placeholder="Enter Name" onChangeText={(abc) => setusname(abc)} />
<TextInput style={styles.TextInput} placeholder="Enter Number" onChangeText={(def) => setNumber(def)}/>
<Button title="Add"  onPress={postExample}/>
</View>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#ffffff',
color: 'white',
},
TextInput: {
fontSize: 20,
color: '#000000',
fontWeight: 'bold',

},
tiles: {
flexDirection: 'row',
marginLeft: 20,
justifyContent: 'space-evenly'
},
header: {
backgroundColor: '#000000',
height: 50,
color: 'white',
textAlign: 'center',
fontSize: 20,
fontWeight: 'bold',
justifyContent: 'center',
alignItems: 'center',
paddingTop: 10,
},
goodarea: {
margin:10,
borderWidth: 1,
padding: 10,

borderColor: 'black',
borderRadius: 10,

},
});
