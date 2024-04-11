import { View, Text } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import RideOptionsCard from '../components/RideOptionsCard';

export default function MapScreen() {
  const navigation = useNavigation();

  const Stack = createNativeStackNavigator();

  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 z-10 left-5 p-2 bg-black rounded-full'>
          <ArrowLeftIcon size={20} color='white' />
      </TouchableOpacity>
      <View className='h-1/2'>
        <Map />
      </View>
      <View className='h-1/2'>
        <Stack.Navigator>
          <Stack.Screen name="NavigateCard" component={NavigateCard} options={{ 
            headerShown: false
          }} />
          <Stack.Screen name="RideOptionsCard" component={RideOptionsCard} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </View>
    </View>
  )
}