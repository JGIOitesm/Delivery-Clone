import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'
import { useState } from 'react';
import { useEffect } from 'react';
import SanityClient from '../sanity';
import { urlFor } from '../sanity';

export default function categories() {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    SanityClient.fetch(`
    *[_type == 'Categories']
    `).then((data) => {
      setCategories(data);
    })
  }, [])

  return (
    <ScrollView 
    contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop: 10,
        }}
        horizontal
        showsVerticalScrollIndicator={false}>
        {/* CategoryCard */}

        {categories.map((category) => (
        <CategoryCard 
          key = {category._id}
          imgUrl = {urlFor(category.image).width(200).url()}
          title = {category.name}
        />
        ))}
    </ScrollView>
  )
}