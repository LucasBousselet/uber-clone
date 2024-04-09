import { View, Text, TextInput, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import cities from 'cities-list';
import { ScrollView } from 'react-native-gesture-handler';
import { 
    MagnifyingGlassIcon,
} from 'react-native-heroicons/outline'

/**
 * Holds a static list of +80k cities, used to do a simple autocomplete feature instead of using Google autocomplete API
 */
const citiesArray = Object.keys(cities)

let timeoutRef;

export default function AutoCompleteInput({ handleSuggestionClick, placeholder }) {
    const [filteredCities, setFilteredCities] = useState([]);
    const [textInput, setTextInput] = useState('');

    
    const clearSuggestions = () => {
        setFilteredCities([]);
    }

    const handleTextChange = value => {
        setTextInput(value);
        filterCities(value);
    }
    
    /**
     * Filtering cities based on input, debounced for 500ms
     */
    const filterCities = query => {
        clearTimeout(timeoutRef);
        if (!query) return setFilteredCities([])
    
        timeoutRef = setTimeout(() => {
            console.log('====>', query)
            setFilteredCities(citiesArray.filter(
                city => city.toLowerCase().includes(query.toLowerCase())
            ))
        }, 500)
    }

    const suggestionsList = () => {
        if (!filteredCities.length > 0) return null;
        if (filteredCities.length > 20) return <Text>Too many results</Text>;
        return <View className='relative z-50'>
            <View className='absolute bg-white left-0 right-0'>
                <ScrollView className='border border-gray-200 rounded-md divide-y divide-gray-200 space-y-1 flex max-h-36'>
                    {filteredCities.map((city, index) => (
                        <TouchableOpacity 
                            key={index} 
                            className='h-8 px-2 justify-center'
                            onPress={(e) => {
                                setTextInput(city);
                                clearSuggestions();
                                handleSuggestionClick(city);
                            }}
                            >
                            <Text>{city}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    }


    return (<>
            <Pressable onPress={clearSuggestions} className='absolute h-screen w-screen'/>
            <View className='flex-row items-center space-x-2 pb-2 mx-4'>
                <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
                    <MagnifyingGlassIcon color='gray' size={20}/>
                    <TextInput 
                        placeholder={placeholder}
                        keyboardType='default'
                        onChangeText={handleTextChange}
                        value={textInput}
                    />
                </View>
            </View>
            {suggestionsList()}
        </>
    )
}