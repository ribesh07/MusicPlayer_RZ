/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addTrack, setupPlayer } from '../musicPlayerServices';

export default function App() {
  const [isready , setIsready] = useState(false);

  async function InitializeSetup(){
    let isSetup = await setupPlayer();
    if(isSetup){
      await addTrack();
    }
    setIsready(isSetup);
  }
  useEffect(()=>{
    InitializeSetup();
  },[]);

  if(!isready){
    return (
      <>
        <StatusBar />
        <ActivityIndicator />
      </>
    );
  }

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.AppText}>App</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AppText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
