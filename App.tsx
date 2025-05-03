import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log("FCM Token:", token);
      } else {
        console.log("No token received yet.");
      }
    } catch (error) {
      console.log("Error fetching token:", error);
    }
  };
  
  useEffect(()=>{
    requestUserPermission()
    getToken()
    
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to React Native</Text>
        <Text style={styles.subtitle}>This is push notification demo.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold'
    
  },
  subtitle: {
    fontSize: 18
   
  },
});

export default App;
