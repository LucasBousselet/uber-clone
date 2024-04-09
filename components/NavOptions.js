import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { 
    ArrowRightIcon,
} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectIsOriginSet } from '../slices/navSlice';

const data = [{
    id: '123',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'Map' // MapScreen key
}, {
    id: '456',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'Eats' // fake
}]

export default function NavOptions() {
    const navigation = useNavigation();
    const isOriginSet = useSelector(selectIsOriginSet);

    return (
        <FlatList 
            data={data}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate(item.screen)}
                    className={`p-2 pl-6 pb-8 pt-4 bg-gray-200 flex-1 m-2 ${!isOriginSet ? 'opacity-40' : ''}`}
                    disabled={!isOriginSet}
                >
                    <View>
                        <Image 
                            source={{
                                uri: item.image
                            }}
                            style={{
                                width: 120,
                                height: 120,
                                resizeMode: 'contain' // Keeps the aspect ratio
                            }}
                        />
                        <Text className='mt-2 text-lg font-semibold'>{item.title}</Text>
                        <View className='p-2 bg-black rounded-full w-9 h-9 mt-4 items-center'>
                            <ArrowRightIcon size={20} color='white' />
                        </View>
                    </View>
                    
                </TouchableOpacity>
            )}
        />
    )
}