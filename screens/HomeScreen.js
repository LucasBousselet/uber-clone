import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavOptions from '../components/NavOptions'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import AutoCompleteInput from '../components/AutoCompleteInput'

export default function HomeScreen() {
    const dispatch = useDispatch();
  
    /**
     * User actually has to click on the suggestion to move ahead with the work flow, just typing in won't be enough.
     * This is similar to a real life location input that won't let you type in a place that doesn't exist / isn't known in DB
     */
    const handleSuggestionClick = (city) => {
        console.log('setting origin...')
        // fake lat/long, as we're not using Google Places API
        dispatch(setOrigin({
            location: { longitude: -0.08749161762706942, latitude: 51.50801128717244 },
            description: "Hope you like London Bridge! That's where you're going!"
        }))
        dispatch(setDestination(null));
    }

    return (
        <SafeAreaView className='bg-white h-full'>
            <View className='p-5'>
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/gzs'
                    }}
                    style={{
                        height: 100, 
                        width: 100,
                        resizeMode: 'contain'
                    }}
                />
                <AutoCompleteInput placeholder='Where From?' handleSuggestionClick={handleSuggestionClick}/>
                <NavOptions />
            </View>
    </SafeAreaView>
  )
}