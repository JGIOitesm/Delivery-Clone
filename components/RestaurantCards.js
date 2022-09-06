import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

export default function RestaurantCards({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
}) {

    const navigation = useNavigation();
  return (
    <TouchableOpacity 
    onPress={()=>{
        navigation.navigate('Restaurant',{
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        })
    }}
    className='bg-red-900 mr-3 shadow rounded-xl'>
        <Image 
        source = {{
            uri:urlFor(imgUrl).url()
        }}
        className='h-36 w-70 rounded-t-xl'/>
        <View className = 'px-3 pb-4'>
            <Text className='font-bold text-lg pt-2 text-white'>
                {title}
            </Text>
            <View className = 'flex-row items-center space-x-1'>
                <StarIcon color='red' opacity={0.5} size={22}/>
                <Text className = 'text-red-500'>
                    {rating} · {genre}
                </Text>
            </View>
            <View className = 'flex-row items-center space-x-1'>
                <LocationMarkerIcon color='black' opacity={0.5} size={22}/>
                <Text className='text-xs text-gray-200'>Nearby {address}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}