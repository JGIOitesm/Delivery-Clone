import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import SanityClient from '../sanity';
import RestaurantCards from '../components/RestaurantCards';

export default function CategoryScreen() {
    
  const [restaurants, setRestaurants] = useState([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [])

    const {
      params: {title}
  } = useRoute();

  useEffect(()=>{
    SanityClient.fetch(`
    *[_type == 'Restaurant']{
      ...,
      dishes[]->,
      type->{
        name
      }
    }
    `).then((data) => {
      setRestaurants(data);
    })
  }, [])

  var restaurantsFilter = []
  restaurants?.map((restaurant) => {
    if(restaurant.type?.name === title){
      restaurantsFilter.push(restaurant)
    }
  })

    return (
    <SafeAreaView className = 'flex-1 bg-gray-900'>
      <View className='flex-1 bg-gray-800'>
        <View className='p-5 border-b border-red-900 bg-gray-900 shadow-xs'>
          <View>
            <Text className = 'text-lg font-bold text-white text-center'>{title}</Text>
          </View>
          <TouchableOpacity 
          onPress={navigation.goBack}
          className = 'rounded-full bg-gray-200 absolute top-3 right-5'>
            <XCircleIcon color='red' height={50} width={50}/>
          </TouchableOpacity>
        </View>
        <ScrollView
        className = 'pt-4'
        contentContainerStyle ={{
          paddingHorizontal: 15,
        }}
        >
          {/* RestaurantCards */}
          {(restaurantsFilter?.map((restaurant) => (
            <View className = 'mb-5'>
              <RestaurantCards
              key = {restaurant._id}
              id = {restaurant._id}
              imgUrl = {restaurant.image}
              title = {restaurant.name}
              rating = {restaurant.rating}
              address = {restaurant.address}
              genre = {restaurant.type?.name}
              short_description= {restaurant.short_description}
              dishes = {restaurant.dishes}
              long = {restaurant.long}
              lat = {restaurant.lat}
              />
            </View>
            )))}
          
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}