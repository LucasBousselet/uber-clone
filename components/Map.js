import React from 'react'
import { useSelector } from 'react-redux'
import { selectDestination, selectIsDestinationSet, selectIsOriginSet, selectOrigin } from '../slices/navSlice'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function Map() {
    const { location: { longitude: originLongitude, latitude: originLatitude }, description: originDescription } = useSelector(selectOrigin);
    console.log('or: ', originDescription)
    // const destination = useSelector(selectDestination);
    // let destinationLongitude, destinationLatitude, destinationDescription;
    // if (destination?.description) {
    //     destinationDescription = destination.description;
    //     destinationLatitude = destination.latitude;
    //     destinationLongitude = destination.longitude;
    // }
    const isOriginSet = useSelector(selectIsOriginSet);
    // const isDestinationSet = useSelector(selectIsDestinationSet);

    // console.log('or/des: ', originDescription, destinationDescription)
    if (!isOriginSet) return null;

    return (
        <MapView
            initialRegion={{
                latitude: originLatitude,
                longitude: originLongitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
            className='flex-1'
            mapType='mutedStandard'           
        >
            {/* {isOriginSet && isDestinationSet && (
                <MapViewDirections 
                    origin={originDescription}
                    destination={destinationDescription}
                    apiKey={:(}
                    strokeWidth={3}
                    strokeColor='black'
                />
            )}    */}
            <Marker 
                coordinate={{
                    latitude: originLatitude,
                    longitude: originLongitude
                }}
                title='Origin'
                description={originDescription}
                identifier='origin'
                pinColor='#00CCBB'
            />
            {/* {isDestinationSet && (
                <Marker 
                    coordinate={{
                        latitude: destinationLatitude,
                        longitude: destinationLongitude
                    }}
                    title='Destination'
                    description={destinationDescription}
                    identifier='destination'
                    pinColor='#00CCBB'
                />
            )} */}
        </MapView>
    )
}