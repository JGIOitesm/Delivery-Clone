import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../features/restaurantSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addToBasketIndex, removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useMemo } from 'react';
import { useState } from 'react';
import { PlusCircleIcon, XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import { useLayoutEffect } from 'react';

export default function BasketScreen() {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket,setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal)

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items])

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown:false,
      })
  }, [])

  return (
    <SafeAreaView className = 'flex-1 bg-gray-900'>
      <View className='flex-1 bg-gray-800'>
        <View className='p-5 border-b border-red-900 bg-gray-900 shadow-xs'>
          <View>
            <Text className = 'text-lg font-bold text-white text-center'>Basket</Text>
            {/* <Text className = 'text-center text-gray-400'>{restaurant.title}</Text> */}
          </View>
          <TouchableOpacity 
          onPress={navigation.goBack}
          className = 'rounded-full bg-gray-200 absolute top-3 right-5'>
            <XCircleIcon color='red' height={50} width={50}/>
          </TouchableOpacity>
        </View>
        <View className = 'flex-row items-center space-x-4 px-4 py-3 bg-gray-700 my-5'>
          <Image
            source = {{
              uri: 'http://links.papareact.com/wru'
            }}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
            />
            <Text className='flex-1 text-white'>
              Deliver in 50-75 min
            </Text>
            <TouchableOpacity>
              <Text className='text-red-500'>Change</Text>
            </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key,items])=>(
            <View key = {key}
            className = 'flex-row items-center space-x-3 bg-gray-700 py-2 px-5'>
              <Text className = 'text-white'>{items.length}x</Text>
              <Image
              source={{uri:urlFor(items[0]?.image).url()}}
              className='h-12 w-12 rounded-full'/>
              <View className = 'flex-1'>
                <Text className = ' text-white'>{items[0]?.name}</Text>
                <Text className = ' text-white text-xs'>{items[0]?.restaurantName}
              </Text>
              </View>
              <TouchableOpacity>
              <PlusCircleIcon 
                    onPress={()=>dispatch(addToBasketIndex({id: key}))}
                    color = 'red'
                    size={40}/>
              </TouchableOpacity>
              <Text className = 'text-gray-400'>$ {items[0]?.price}</Text>
              <TouchableOpacity>
                <Text className='text-red-500 text-xs'
                onPress={()=>dispatch(removeFromBasket({id: key}))}> REMOVE</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className='p-5 bg-gray-900 mt-5 space-y-4'>
          <View className = 'flex-row justify-between'>
            <Text className = 'text-gray-400'>Subtotal</Text>
            <Text className = 'text-gray-400'>$ {(basketTotal).toFixed(2)}</Text>
          </View>
          <View className = 'flex-row justify-between'>
            <Text className = 'text-gray-400'>Delivery Fee</Text>
            <Text className = 'text-gray-400'>$ {(basketTotal*0.1).toFixed(2)}</Text>
          </View>
          <View className = 'flex-row justify-between'>
            <Text className = 'text-white'>Order Total</Text>
            <Text className = 'text-white font-extrabold'>$ {(basketTotal*1.1).toFixed(2)}</Text>
          </View>
          <TouchableOpacity 
          onPress={items.length !== 0 ? ()=>navigation.navigate('PreparingOrderScreen'): null}
          className={items.length !== 0 ? 'rounded-lg bg-red-600 p-4': 'rounded-lg bg-gray-600 p-4'}>
            <Text className='text-center text-white text-lg font-bold'>{items.length !== 0 ? 'Place Order': 'Select food to order first'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}