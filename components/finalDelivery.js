import {useEffect, useRef} from 'react';
import Header from './header';
import {View, Text, StyleSheet, Pressable, Button, PermissionsAndroid, NativeModules} from 'react-native';
var DirectSms = NativeModules.DirectSms;
import {decode as atob, encode as btoa} from 'base-64';
export default function FinalDelivery({route, navigation}) {
  const {equipmentfromsms, reqtypefromsms, responsetodisplay} = route.params;

   let btnref = useRef(null);


  useEffect(() => {
    // alert(typeof(responsetodisplay));

 
  }, []);




  const sendsms = async sFeature => {
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
        await DirectSms.sendDirectSms(
          '+18077709098',sFeature,
        );
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  
  function returnjson(equipment, reqtype, location) {
        let json = {};
        json['equipment'] = equipment;
        json['reqtype'] = reqtype;
        json['location'] = location;
        // console.log(json);
        let jsx = (JSON.stringify(json));
        sendsms(btoa(jsx));
        return(btoa(jsx));
        
  }

  return (
    <>
      <View style={styles.container}>
        <Header />
        <View style={styles.table}>
         <Text style={styles.texty}>Here are the final deliverey location for Equipment Number: {equipmentfromsms}</Text>

          {responsetodisplay.map((element, key) => {
            return (
              <View style={styles.oneline}>
                <Text style={styles.textX}>{element[0]}</Text>
                <Text style={styles.textbold}></Text>
                <Text style={styles.text}>
                  {element[1] == 0 ? <Button title="Update" onPress={() => {
                
                returnjson(equipmentfromsms, "update", element[0])
                alert("Status Updated");
                  }
                } />
: 'Unavailable'}
                </Text>
              </View>

            );
          })}

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  table: {
    backgroundColor: '#f8f8ff',
    flexDirection: 'column',
    justifyContent: 'space-evenly',

    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    

    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 100,
    textAlign: 'left'
  },

  textbold: {
    borderLeftColor: 'rgba(158, 150, 150, .5)',
    borderLeftWidth: 1,
  },

  textX: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 100,
  },
  oneline: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    borderColor: 'rgba(158, 150, 150, .5)',
    borderWidth: 1,
    width: '100%',
  },
    texty: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: "100%",
    textAlign: 'left',
    margin: 10
    },
});
