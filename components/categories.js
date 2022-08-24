import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'

export default function categories() {
  return (
    <ScrollView 
    contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop: 10,
        }}
        horizontal
        showsVerticalScrollIndicator={false}>
        {/* CategoryCard */}
        <CategoryCard 
        imgUrl = 'http://links.papareact.com/gn7' 
        title = 'testing 1'/>
        <CategoryCard 
        imgUrl = 'http://links.papareact.com/gn7' 
        title = 'testing 2'/>
        <CategoryCard 
        imgUrl = 'http://links.papareact.com/gn7' 
        title = 'testing 3'/>
    </ScrollView>
  )
}