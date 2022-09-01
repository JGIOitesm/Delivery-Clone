import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress  from 'react-native-progress'
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';

export default function PreparingOrderScreen() {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
            navigation.navigate('DeliveryScreen')
        }, 6000);
    },[])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        })
    }, [])
  return (
    <SafeAreaView className='bg-gray-800 flex-1 justify-center items-center'>
      <Animatable.Image
        source = {{uri: 'https://cdn.dribbble.com/users/324739/screenshots/1927021/delivery-guy.gif'}}
        animation='slideInUp'
        iterationCount={1}
        className='h-96 w-96'
      />
      <Animatable.Text animation='slideInUp'
      iterationCount={1}
      className = 'text-lg my-10 text-white font-bold text-center'>
        Waiting for Restaurant to accept your order
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color='red'/>
    </SafeAreaView>
  )
}