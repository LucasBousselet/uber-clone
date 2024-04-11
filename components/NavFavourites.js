import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { 
    BriefcaseIcon,
    HomeIcon,
} from 'react-native-heroicons/solid';

const data = [{
    id: '123',
    icon: 'house',
    location: 'Home',
    destination: 'Code Street, London, UK'
}, {
    id: '456',    
    icon: 'work',
    location: 'Work',
    destination: 'London Eye, London, UK'
}]

export default function NavFavourites() {
    const getIcon = name => {
        if (name === 'house') return <View className='mr-4 rounded-full bg-gray-300 p-3'><HomeIcon size={18} color='white'/></View>;
        return <View className='mr-4 rounded-full bg-gray-300 p-3'><BriefcaseIcon size={18} color='white'/></View>;
    }

    return (
        <FlatList 
            data={data}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View className='bg-gray-200 h-[0.5]' />}
            renderItem={({ item: { location, destination, icon }}) => (
                <TouchableOpacity className='flex-row items-center p-5'>
                    {getIcon(icon)}
                    <View>
                        <Text className='font-semibold text-lg'>{location}</Text>
                        <Text className='text-gray-500'>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}