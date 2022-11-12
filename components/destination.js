import {useEffect, useState} from 'react';
import {decode as atob, encode as btoa} from 'base-64';
import SendSMS from 'react-native-sms';

import SmsAndroid from 'react-native-get-sms-android';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  NativeModules,
  PermissionsAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Header from './header';
export default function Destination({navigation}) {
  var DirectSms = NativeModules.DirectSms;
  const [Equipment, setEquipment] = useState('');
  const [selectedFeature, setselectedFeature] = useState('');
  const [jsonsecret, setjsonsecret] = useState('');
  const [equipmentfromsms, setequipmentfromsms] = useState('');
  const [reqtypefromsms, setreqtypefromsms] = useState('');
  const [responsetodisplay, setresponsetodisplay] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [showfdlframe, setshowfdlframe] = useState(false);
  async function requestReadSmsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'Auto Verification OTP',
          message: 'need access to read sms, to verify OTP',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('sms read permissions granted', granted);
      } else {
        console.log('sms read permissions denied', denied);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const jsonString = (equipment, reqtype) => {
    var data = {
      cargoStuffingNumber: equipment,
      requestType: reqtype,
    };
    return btoa(JSON.stringify(data));
  };

  const keys = {
    getETA: 'ETA',
    getETD: 'ETD',
    getETB: 'ETB',
    pod: 'Port of Discharge',
    getFDL: 'FDL',
    0: 'NONE',
  };

  getSMS = () => {
    let filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
      // the next 4 filters should NOT be used together, they are OR-ed so pick one
      // read: 1, // 0 for unread SMS, 1 for SMS already read
      // _id: 1234, // specify the msg id
      // address: '57575701', // sender's phone number
      // body: '@anonpe.com', // content to match
      // // // the next 2 filters can be used for pagination
      indexFrom: 0, // start from index 0
      maxCount: 1, // count of SMS to return each time
    };
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        // console.log('Count: ', count);
        // console.log('List: ', smsList);
        var arr = JSON.parse(smsList);

        arr.forEach(function (object) {
          // console.log('Object: ' + object);
          // console.log('-->' + object.date);
          console.log('-->' + object.body);
          setjsonsecret(object.body);
          extractCode(object.body);
          return;
          // alert('your message with selected id is --->' + object.body)
        });
      },
    );
  };
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
          '+18077709098',
          jsonString(Equipment, sFeature),
        );
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  async function extractCode() {
    if (jsonsecret != '') {
      const myArray = jsonsecret.split(' ');
    //   console.log(myArray[3]);
      // let code = jsonsecret.replace("Your OTP is ", "");;
      let code = myArray[3];
    //   console.log(atob(code));
      //json decode
      try {
        var decoded = await JSON.parse(atob(code));
        // console.log(decoded.response);
        setresponsetodisplay(decoded.response);
        setequipmentfromsms(decoded.cargoStuffingNumber);
        setreqtypefromsms(decoded.requestType);
        if (decoded.requestType == 'getFDL') {
          setshowfdlframe(true);
          console.log("true");
        }
        else{
            setshowfdlframe(false);
        }
        // alert('ETA for Equipment:'+ decoded.cargoStuffingNumber + " is: "+(decoded.response));
      } catch (err) {
        console.log('Alert: ' + err);
      }
    }
  }

  useEffect(() => {
    setshowfdlframe(false);
    setInterval(function () {
      getSMS();
    }, 2500);
  }, []);

  useEffect(() => {
    async function abc() {
      if (toggle) {
        console.log('selectedFeature', selectedFeature);
        // alert(selectedFeature);
        // await sendsms();
        getSMS();

        requestReadSmsPermission();
      }
      settoggle(false);
    }

    abc();
  }, [selectedFeature]);

  //   useEffect(() => {

  //     setModalVisible(true);
  //         },[setreqtypefromsms]);

  function abc() {
    console.log(selectedFeature);
    console.log(Equipment);
  }

  function navigateToFDL(){
    setModalVisible(!modalVisible);
    navigation.push('FinalDelivery', {equipmentfromsms: equipmentfromsms,
        reqtypefromsms: reqtypefromsms,
        responsetodisplay: responsetodisplay});
    console.log('navigateToFDL');
  }

  return (
    <>
      <View style={styles.test}>
        <Header />
        <View style={styles.header}>
          <TextInput
            placeholder="Enter the Equipment Number"
            style={styles.maerskinput}
            onChangeText={text => {
              setEquipment(text);
            }}></TextInput>
        </View>
        <View style={styles.parent}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={async () => {
                settoggle(true);
                sendsms('getETA');
                setModalVisible(true);
              }}
              style={styles.button}>
              <View>
                <Text style={styles.textStyle}>ETA</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                settoggle(true);
                sendsms('pod');
                setModalVisible(true);
              }}
              style={styles.button}>
              <View>
                <Text style={styles.textStyle}>POD</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={async () => {
                settoggle(true);
                // sendsms('getFDL');
                setModalVisible(true);
              }}
              style={styles.button}>
              <View>
                <Text style={styles.textStyle}>Final Delivery Location</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={abc} style={styles.button}>
              <View>
                <Text style={styles.textStyle}>BL Number</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={abc} style={styles.button}>
              <View>
                <Text style={styles.textStyle}>POD</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={abc} style={styles.button}>
              <View>
                <Text style={styles.textStyle}>BL Number</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                console.log('FDL');
              }}
              style={styles.button}>
              <View>
                <Text style={styles.textStyle}>ETD</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={abc} style={styles.button}>
              <View>
                <Text style={styles.textStyle}>Planning Status</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Modal
            animationType="slide"
            //   transparent={true}
            visible={modalVisible}
            presentationStyle="fullScreen"
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {showfdlframe == true ? (
                     <Pressable
                     style={[styles.buttonM]}
                     onPress={navigateToFDL}>
                     <Text style={styles.textStyle}>Open Final Delivery Location in Detail</Text>
                   </Pressable>
                ) : (
                  <Text style={styles.modalText}>
                    {keys[reqtypefromsms]} for Equipment: {equipmentfromsms} is:{' '}
                    {responsetodisplay}
                  </Text>
                )}
                <Pressable
                  style={[styles.buttonX, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>

      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.viewbtn}>
          <Text style={styles.textStyle}>Display previous query result</Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 100,
    padding: 10,
    width: '100%',
    opacity: 0.8,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 2,
  },
  viewbtn: {
    //maersk colour
    backgroundColor: '#003366',
    color: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  header: {
    // backgroundColor: '#fff', //maersk colour
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 50,
  },
  maerskinput: {
    backgroundColor: '#fff',
    height: 50,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#42B0D5',
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    elevation: 50,
  },

  //maersk button
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#42B0D5',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 100,
  },
  footer: {
    //maersk colour

    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 50,
  },
  footerbutton: {
    //maersk colour
    backgroundColor: '#fff',
    height: 100,
    width: '100%',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    backgroundColor: '#42B0D5',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#42B0D5',
  },
  buttonX: {
    borderRadius: 1,
    top: 10,
    padding: 10,
    textAlign: 'center',
    elevation: 2,
    backgroundColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  test: {
    flex: 1,
    backgroundColor: '#fff',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',

    fontWeight: 'bold',
  },

  //maersk button
    buttonM: {
        backgroundColor:'#1E6738',
    borderColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
   
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    },

});
