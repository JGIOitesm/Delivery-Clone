import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function FeedbackScreen() {
    const navigation = useNavigation();
  return (
    <View  className = 'bg-gray-800 flex-1'>
        <SafeAreaView className = 'bg-gray-800 flex-1'>
            <View className = 'm-5 flex-1 space-y-5'>
                <Text className = 'text-xl font-bold text-white'>Write your complaints about the possible problems you have with the dish, including your mentioned allergies:</Text>
                <TextInput placeholder='Escriba aquí'
                keyboardType='default'
                className = 'flex-1 bg-black text-white'/>
                <TouchableOpacity className = 'bg-red-700 rounded justify-center items-center'
                onPress={navigation.goBack}>
                    <Text className = 'text-3xl font-extrabold text-white m-4'>Enviar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
  )
}