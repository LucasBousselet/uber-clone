import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavOptions from '../components/NavOptions'
import { useDispatch } from 'react-redux'
import { initialState, setDestination, setOrigin } from '../slices/navSlice'
import AutoCompleteInput from '../components/AutoCompleteInput'
import NavFavourites from '../components/NavFavourites'
import { getOriginCoordinatesAsync } from '../api/dataService'

export default function HomeScreen() {
    const dispatch = useDispatch();
  
    /**
     * User actually has to click on the suggestion to move ahead with the work flow, just typing in won't be enough.
     * This is similar to a real life location input that won't let you type in a place that doesn't exist / isn't known in DB
     */
    const handleSuggestionClick = () => {
        // fake lat/long, as we're not using Google Places API
        getOriginCoordinatesAsync().then(origin => {
            dispatch(setOrigin({
                location: { ...origin.location },
                description: origin.description
            }))
            dispatch(setDestination(initialState.destination));
        })
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
                <NavFavourites />
            </View>
    </SafeAreaView>
  )
}