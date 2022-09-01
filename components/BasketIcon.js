import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function BasketIcon() {
    const items = useSelector(selectBasketItems)
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal)

    if(items.length == 0) return null

  return (
    <View className = 'absolute bottom-0 h-36 w-full z-50 bg-gray-900'>
      <TouchableOpacity 
      onPress={()=>navigation.navigate('Basket')}
      className = 'mx-5 mt-8 bg-red-600 p-4 rounded-lg flex-row items-center space-x-1'>
        <Text className = 'text-white font-extrabold text-lg bg-red-800 py-1 px-2'>
            {items.length}
        </Text>
        <Text className = 'flex-1 text-white font-extrabold text-lg text-center'>
            View Basket
        </Text>
        <Text className = 'text-lg text-white font-extrabold'>
            $ {basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  )
}