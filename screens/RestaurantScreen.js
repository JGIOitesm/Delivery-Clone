import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import {useNavigation} from '@react-navigation/native';
import {urlFor} from '../sanity';
import { ArrowLeftIcon,ChevronRightIcon,LocationMarkerIcon,QuestionMarkCircleIcon,StarIcon } from 'react-native-heroicons/solid';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
import { useEffect } from 'react';

export default function RestaurantScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        params: {
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
        }
    } = useRoute();

    useEffect(() => {
        dispatch(setRestaurant({
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
        }))
    }, [dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        })
    }, [])
  return (
    <>
    <BasketIcon/>
    <SafeAreaView className = 'bg-gray-800 pt-5'>
        <ScrollView>
            <View className = 'relative'>
                <Image
                source = {{
                    uri: urlFor(imgUrl).url(),
                }}
                className='w-full h-56 bg-gray-300 p-4'/>
                <TouchableOpacity 
                onPress={navigation.goBack}
                className = 'absolute top-14 left-5 p-2 bg-black rounded-full'>
                    <ArrowLeftIcon size={20} color='#DDDDDD'/>
                </TouchableOpacity>
            </View>
            <View className = 'bg-gray-900'>
                <View className = 'px-4 pt-4'>
                    <Text className='text-3xl font-bold text-white'>{title}</Text>
                    <View className='flex-row space-x-2 my-1'>
                        <View className = 'flex-row items-center space-x-1'>
                            <StarIcon color = 'red' opacity={0.5} size={20}/>
                            <Text className = 'text-xs text-gray-500'>
                                <Text className='text-red-500'>{rating} · {genre}</Text>
                            </Text>
                            <View className = 'flex-row items-center space-x-1'>
                                <LocationMarkerIcon color='gray' opacity={0.5} size={22}/>
                                <Text className='text-xs text-gray-200'>Nearby {address}</Text>
                            </View>
                        </View>
                    </View>
                    <Text className='text-gray-300 mt-2 pb-4'>{short_description}</Text>
                </View>
                <TouchableOpacity 
                className='flex-row items-center space-x-2 p-4 border-y border-gray-300'
                onPress={()=>navigation.navigate('Feedback')}>
                    <QuestionMarkCircleIcon color='gray' opacity={0.5} size={22}/>
                    <Text className='pl-2 flex-1 text-md font-bold text-gray-500'>Have food allergy?</Text>
                    <ChevronRightIcon color = 'red'/>
                </TouchableOpacity>
            </View>
            <View className='pb-80'>
                <Text className ='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>
                {/* Dishrows */}
                {dishes?.map(dish =>(
                    <DishRow
                    key={dish._id}
                    id = {dish._id}
                    name = {dish.name}
                    description = {dish.short_description}
                    price={dish.price}
                    image={dish.image}
                    restaurantName ={title}
                    />
                ))}
            </View>
        </ScrollView>
    </SafeAreaView>
    </>
  )
}