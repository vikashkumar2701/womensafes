import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  NativeModules,
  Pressable,
} from 'react-native';
var DirectSms = NativeModules.DirectSms;

// import * as SMS from 'expo-sms';
import {PermissionsAndroid} from 'react-native';
import Header from './header';
export default function Dashboard({navigation}) {
  const sendsms = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'YourProject App Sms Permission',
          message:
            'YourProject App needs access to your inbox ' +
            'so you can send messages in background.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DirectSms.sendDirectSms('8002440660', 'This is a direct asdas');
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header />

        <View style={styles.tiles}>

            <Pressable onPress={() => navigation.push('Capability')}>
            <View style={styles.btn} >
            <Text style={styles.tileText}>SOS</Text>
            </View>
            </Pressable>
            <View style={styles.btn}>
            <Text style={styles.tileText} onPress={() => navigation.push('AddContacts')}>Add Contacts</Text>
            </View>
        </View>
        <View style={styles.tiles}>

            
<View style={styles.btn} onPress={() => navigation.push('Capability')}>
<Text style={styles.tileText}></Text>
</View>
<View style={styles.btn}>
<Text style={styles.tileText}>More..</Text>
</View>
</View>

        {/* <Button title="Send SMS" onPress={sendsms}/> */}
      </View>
    </>
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
    textAlign: 'center',
    alignItems: 'center',
  },
  tiles: {
    flexDirection: 'row',
     marginLeft: 20,
      justifyContent: 'space-evenly'
    },
  button: {
    backgroundColor: 'red',
  },
  btn: {
    backgroundColor: '#000000',
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    },
    tileText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    }
});
