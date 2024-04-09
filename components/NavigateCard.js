import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AutoCompleteInput from './AutoCompleteInput'
import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default function NavigateCard() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    /**
     * User actually has to click on the suggestion to move ahead with the work flow, just typing in won't be enough.
     * This is similar to a real life location input that won't let you type in a place that doesn't exist / isn't known in DB
     */
    const handleSuggestionClick = (city) => {
        console.log('setting destination...')
        // fake lat/long, as we're not using Google Places API
        dispatch(setDestination({
            location: { longitude: -0.454782781121563, latitude: 51.46814509312758 },
            description: "Your place is waiting! Full throttle to Heathrow International!"
        })) 
        dispatch(setDestination(null));
        navigation.navigate('RideOptionsCard');
    }

    return (
        <SafeAreaView className='bg-white flex-1'>
            <Text className='text-center py-5 text-xl'>Good Morning, Folk!</Text>
            <View className='border-t border-gray-200 flex-shrink'>
                <View>
                    <AutoCompleteInput placeholder='Where to?' handleSuggestionClick={handleSuggestionClick} />
                </View>
            </View>
        </SafeAreaView>
    )
}