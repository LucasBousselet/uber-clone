import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import { currencyFormatter } from '../utils/common'

const data = [{
  id: 'Uber-X-123',
  title: 'UberX',
  multiplier: 1,
  image: 'https://links.papareact.com/3pn'
}, {
  id: 'Uber-XL-456',
  title: 'Uber XL',
  multiplier: 1.2,
  image: 'https://links.papareact.com/5w8'
}, { 
  id: 'Uber-LUX-789',
  title: 'Uber LUX',
  multiplier: 1.75,
  image: 'https://links.papareact.com/7pf'
}];

const SURGE_CHARGE_RATE = 1.5;

export default function RideOptionsCard() {
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView className='bg-white flex-1'>
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('NavigateCard')} 
          className='absolute top-3 left-5 p-3 z-10 rounded-full bg-red-100'
        >
          <ChevronLeftIcon size={20} color='black'/>
        </TouchableOpacity>
        <Text className='text-center py-5 text-xl'>Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>
      <FlatList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row items-center justify-between px-10 ${item.id === selected?.id && 'bg-gray-200'}`}
          >
            <Image 
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain'
              }}
              source={{ uri: item.image }}
            />
            <View className='-ml-6'>
              <Text className='text-xl font-semibold'>{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text} travel time</Text>
            </View>
            <Text className='text-xl'>{currencyFormatter.format((travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier) / 1000)}</Text>
          </TouchableOpacity>
        )}
      />
      <View className='mt-auto border-t border-gray-200'>
        <TouchableOpacity disabled={!selected} className={`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text className='text-center text-white text-xl'>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}