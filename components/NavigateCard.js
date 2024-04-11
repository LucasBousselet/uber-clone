import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AutoCompleteInput from './AutoCompleteInput'
import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { TruckIcon, CakeIcon } from 'react-native-heroicons/solid'
import { getDestinationCoordinatesAsync } from '../api/dataService'

export default function NavigateCard() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    /**
     * User actually has to click on the suggestion to move ahead with the work flow, just typing in won't be enough.
     * This is similar to a real life location input that won't let you type in a place that doesn't exist / isn't known in DB
     */
    const handleSuggestionClick = (city) => {
        // fake lat/long, as we're not using Google Places API
        getDestinationCoordinatesAsync().then(destination => {
            dispatch(setDestination({
                location: { ...destination.location },
                description: destination.description
            })) 
            navigation.navigate('RideOptionsCard');
        })
    }

    return (
        <SafeAreaView className='bg-white flex-1'>
            <Text className='text-center py-2 text-xl'>Good Morning, Folk!</Text>
            <View className='border-t border-gray-200 flex-shrink'>
                <View className='mt-2'>
                    <AutoCompleteInput placeholder='Where to?' handleSuggestionClick={handleSuggestionClick} />
                </View>

                <NavFavourites />

                <View className='flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100'>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RideOptionsCard')}
                        className='flex flex-row justify-between w-24 px-4 py-3 rounded-full bg-black'
                    >
                        <TruckIcon size={16} color='white' />
                        <Text className='text-white text-center'>Rides</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className='flex flex-row justify-between w-24 px-4 py-3 rounded-full'>
                        <CakeIcon size={16} color='black' />
                        <Text className='text-center'>Eats</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}