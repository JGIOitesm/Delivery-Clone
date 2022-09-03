import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { XIcon } from 'react-native-heroicons/solid';
import * as Progress  from 'react-native-progress';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useLayoutEffect } from 'react';
// import MapViewDirections from 'react-native-maps-directions';

export default function DeliveryScreen() {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    console.log(restaurant)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        })
    }, [])
  return (
    <View className='bg-gray-800 flex-1'>
        <SafeAreaView className='z.50'>
            <View className = 'flex-row justify-between items-center p-5'>
                <TouchableOpacity onPress = {()=> navigation.navigate('Home')}>
                    <XIcon color = 'white' size = {30}/>
                </TouchableOpacity>
                <Text className = 'font-light text-white text-lg'>Order Help</Text>
            </View>
            <View className = 'bg-black mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
                <View className='flex-row justify-between'>
                    <View>
                    <Text className = 'text-lg text-gray-400'> Estimated Arrival</Text>
                    <Text className = 'text-3xl font-bold text-white'>40-55 Minutes</Text>
                </View>
                <Image
                source ={{uri: 'https://www.thesocial.ee/img/delivery-boy.gif'}}
                className = 'h-20 w-28'/>
                </View>
                <Progress.Bar size = {30} color = 'red' indeterminate={true}/>
                <Text className='mt-3 text-gray-500'>
                    Your order at {restaurant.title} is being prepared
                </Text>
            </View> 
        </SafeAreaView>
        <MapView
                showsPointsOfInterest={true}
                showsUserLocation={true}

                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                className = 'flex-1 mt-10 z-0'
                mapType='mutedStandard'>
                    <Marker
                        coordinate = {{
                            latitude: restaurant.lat,
                            longitude: restaurant.long,
                        }}
                        title = {restaurant.title}
                        description = {restaurant.description}
                        identifier='origin'
                        pinColor='red'/>
                    {/* <Marker
                        coordinate = {{
                            latitude: 19.28374348405835,
                            longitude:  -99.13352377869786,
                        }}
                        title = {restaurant.title}
                        description = {restaurant.description}
                        identifier='origin'
                        pinColor='red'/>
                    <MapViewDirections
                        origin={{
                            latitude: restaurant.lat,
                            longitude: restaurant.long,
                        }}
                        destination = {{
                            latitude: 19.28374348405835,
                            longitude:  -99.13352377869786,
                        }}
                        apikey = {'...'}
                        strokeWidth = {3}
                        strokeColor = 'blue'
                    /> */}
            </MapView>
        <View className = 'bg-white border'>
            <Text></Text>
            <View className = 'mb-14 space-y-5'>
                <Text className = 'text-lg text-gray-400'>Your Delivery Person:</Text>
                <View className = 'flex-row items-center space-x-1 justify-center border'>
                    <Image
                        source = {require('../assets/deliverGuy.jpg')}
                        className='w-24 h-24 p-4 bg-white'/>
                    <Text className = 'text-2xl font-bold'> Víctor Suárez </Text>
                </View>
            </View>
        </View>
    </View>
  )
}