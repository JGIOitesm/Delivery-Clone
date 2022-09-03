import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectedBasketItemsWithId } from '../features/basketSlice';

export default function DishRow({id, name, description, price, image, restaurantName}) {
    const[isPressed,setIsPressed] = useState(false);
    const dispach = useDispatch();
    const items = useSelector((state)=>selectedBasketItemsWithId(state,id))

    const removeItemFromBasket = () => {
        if(!items.length>0) return;
        dispach(removeFromBasket({id}));
    }

    const addItemToBasket = () => {
        dispach(addToBasket({id, name, description, price, image, restaurantName}))
    }
  return (
    <>
        <TouchableOpacity 
        onPress = {()=>setIsPressed(!isPressed)}
        className = 'bg-gray-900 border p-4 border-gray-400'>
            <View className='flex-row'>
                <View className='flex-1 pr-2'>
                    <Text className = 'text-lg mb-1 text-white'>{name}</Text>
                    <Text className = 'text-gray-400'>{description}</Text>
                    <Text className = 'text-gray-400 mt-2'> $ {price}</Text>
                </View>
                <View>
                    <Image source={{
                        uri: urlFor(image).url()
                    }}
                    style = {{
                        borderWidth: 1,
                        borderColor: 'black'
                    }}
                    className='h-20 w-20 bg-gray-300 p-4'/>
                </View>
            </View>
        </TouchableOpacity>
    {isPressed && (
        <View className='bg-gray-700 px-4'>
            <View className='flex-row items-center space-x-2 pb-3'>
                <TouchableOpacity>
                    <MinusCircleIcon 
                    onPress={removeItemFromBasket}
                    color = {items.length > 0 ? 'red' : 'gray'}
                    size={40}/>
                </TouchableOpacity>
                <Text>
                    {items.length}
                </Text>
                <TouchableOpacity>
                    <PlusCircleIcon 
                    onPress={addItemToBasket}
                    color = 'red'
                    size={40}/>
                </TouchableOpacity>
            </View>
        </View>
    )}
    </>
  )
}