import {View, ImageBackground, StyleSheet} from 'react-native';
export default function Header() {

    return (
        <>
         <View style={styles.banner}>
        <ImageBackground source={require('./women.png')}  resizeMode="cover" style={styles.image}>
      
    </ImageBackground>
        </View>
        </>
    );
    }

    const styles = StyleSheet.create({
        banner:{

            height: 100,
            padding: 10,
            width: '100%',
            opacity: 0.8,
    
        },
        image: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#ffffff",
            padding: 10,
            margin: 2
        },

    });
