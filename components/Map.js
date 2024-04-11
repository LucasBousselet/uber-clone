import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectDestination, selectIsDestinationSet, selectIsOriginSet, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch } from 'react-redux';
import { getTravelInforAsync } from '../api/dataService';

export default function Map() {
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    const { location: { longitude: originLongitude, latitude: originLatitude }, description: originDescription } = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    let destinationLongitude, destinationLatitude, destinationDescription;
    if (destination?.description) {
        destinationDescription = destination.description;
        destinationLatitude = destination.location?.latitude;
        destinationLongitude = destination.location?.longitude;
    }
    const isOriginSet = useSelector(selectIsOriginSet);
    const isDestinationSet = useSelector(selectIsDestinationSet);

    if (!isOriginSet) return null;

    useEffect(() => {
        if (!isOriginSet || !isDestinationSet) return;
        // Zoom out to include both markers
        setTimeout(() => {
            mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
            });
        }, 100);
        
        getTravelInforAsync().then(travelInfo => {
            dispatch(setTravelTimeInformation(travelInfo));
        })
    }, [isOriginSet, isDestinationSet]);

    return (<MapView
                ref={mapRef}
                initialRegion={{
                    latitude: originLatitude,
                    longitude: originLongitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                className='flex-1'
                mapType='mutedStandard'           
            >
                {/* Google API stuff {isOriginSet && isDestinationSet && (
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
                {isDestinationSet && (
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
                )}
            </MapView>
    )
}