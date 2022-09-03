import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, LocationMarkerIcon, MailIcon, PhoneIcon } from 'react-native-heroicons/solid';

export default function UserScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className='bg-gray-800 flex-1'> 
        <View>
            <ScrollView>
                <View className = 'relative'>
                    <Image
                            source = {require('../assets/Jorge.jpg')}
                            className='w-full h-60 p-4 bg-white'/>
                    <TouchableOpacity 
                    onPress={navigation.goBack}
                    className = 'absolute top-14 left-5 p-2 bg-black rounded-full'>
                        <ArrowLeftIcon size={20} color='#DDDDDD'/>
                    </TouchableOpacity>
                 </View>
                <View className = 'bg-gray-900'>
                    <View className = 'border border-gray-400 px-4 py-4'>
                        <Text className='text-3xl font-bold text-white'>Jorge Iglesias</Text>
                    </View>
                    <View className = 'px-4 pt-4 border border-gray-400'>
                        <View className='flex-row space-x-2 mb-4'>
                            <View className = 'space-y-3'>
                                <View className = 'flex-row items-center space-x-1'>
                                    <MailIcon color='white' opacity={0.5} size={22}/>
                                    <Text className='text-red-500'> jgiocorreo@gmail.com</Text>
                                </View>
                                <View className = 'flex-row items-center space-x-1'>
                                    <PhoneIcon color='white' opacity={0.5} size={22}/>
                                    <Text className='text-red-500'>+52 55 5960-1318 </Text>
                                </View>
                                <View className = 'flex-row items-center space-x-1'>
                                    <LocationMarkerIcon color='white' opacity={0.5} size={22}/>
                                    <Text className='text-xs text-red-500'>Mantua 17 · Residencial Acoxpa</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}