import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { XCircleIcon } from 'react-native-heroicons/solid';

export default function FeedbackScreen() {
    const navigation = useNavigation();
    const [text, onChangeText] = useState("");
  return (
    <View  className = 'bg-gray-800 flex-1'>
        <SafeAreaView className = 'bg-gray-800 flex-1'>
        <View className='p-5 border-b border-red-900 bg-gray-900 shadow-xs'>
          <View>
            <Text className = 'text-lg font-bold text-white text-center'>Post comment</Text>
            {/* <Text className = 'text-center text-gray-400'>{restaurant.title}</Text> */}
          </View>
          <TouchableOpacity 
          onPress={navigation.goBack}
          className = 'rounded-full bg-gray-200 absolute top-3 right-5'>
            <XCircleIcon color='red' height={50} width={50}/>
          </TouchableOpacity>
        </View>
            <View className = 'm-5 flex-1 space-y-5'>
                <Text className = 'text-xl font-bold text-white'>Write your complaints about the possible problems you have with the dish, including your mentioned allergies:</Text>
                <TextInput placeholder='Escriba aquí'
                keyboardType='default'
                className = 'flex-1 bg-black text-white' 
                value={text}
                onChangeText={onChangeText}/>
                <TouchableOpacity className = {text.length !== 0 ? 'bg-red-700 rounded justify-center items-center': 'bg-gray-700 rounded justify-center items-center'}
                onPress = {text.length !== 0 ? navigation.goBack : null}>
                    <Text className = 'text-3xl font-extrabold text-white m-4'>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
  )
}