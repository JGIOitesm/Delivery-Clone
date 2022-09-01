import { View, Text,SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {UserIcon, ChevronDownIcon, SearchIcon, AdjustmentsIcon} from 'react-native-heroicons/solid'
import Categories from '../components/categories'
import FeaturedRow from '../components/FeaturedRow'
import SanityClient from '../sanity'

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])

  useEffect(()=>{
    SanityClient.fetch(`
    *[_type == 'Featured'] {
      ...,
      Restaurant[]->{
        ...,
        Dish[]->
      }
    }
    `).then((data) => {
      setFeaturedCategories(data);
    })
  }, [])

  return (
    <SafeAreaView className = 'bg-gray-900 pt-5'>
      <View>
        {/*Header*/}
        <View className ='flex-row pb-3 items-center mx-4 space-x-2'>
          <Image
          source = {{
            uri: 'http://links.papareact.com/wru'
          }}
          className='h-7 w-7 bg-gray-300 p-4 rounded-full'
          />
          <View className = 'flex-1'>
            <Text className='font-bold text-gray-400 text-xs'>
              Deliver Now
            </Text>
            <Text className= 'font-bold text-xl text-white'>
              Current Location
              <ChevronDownIcon size={20} color='red'/>
            </Text>
          </View>
          <UserIcon size={35} color='red'/>
        </View>
        {/*Search8*/}
        <View className='flex-row items-center space-x-2 pb-2 mx-4'>
          <View className = 'flex-row space-x-2 flex-1 bg-gray-200 p-3'>
            <SearchIcon/>
            <TextInput placeholder='Restaurants and cuisines'
            keyboardType='default'/>
          </View>
          <AdjustmentsIcon color = 'red'/>
        </View>
      </View>
      {/*Body*/}
      <ScrollView 
      className = 'bg-gray-800 flex-1'
      contentContainerStyle={{
        paddingBottom:100,
      }}
      >
        {/* Categories */}
          <Categories/>
        {/* Featured rows */}
        {/* Featured */}

        {featuredCategories?.map((categories) => (
          <FeaturedRow 
          key={categories._id}
          id = {categories._id}
          title = {categories.name}
          description = {categories.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}