import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  origin: { 
    location: { 
      latitude: null, 
      longitude: null 
    }, 
    description: null },
  destination: { 
    location: { 
      latitude: null, 
      longitude: null 
    }, 
    description: null },
  travelTimeInformation: null
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.origin = action.payload;
    },
    setDestination: (state, action) => {
        state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
        state.travelTimeInformation = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions

export const selectOrigin = state => state.nav.origin;
export const selectDestination = state => state.nav.destination;
export const selectTravelTimeInformation = state => state.nav.travelTimeInformation;
export const selectIsOriginSet = state => state.nav.origin.location.longitude && state.nav.origin.location.latitude && state.nav.origin.description  
export const selectIsDestinationSet = state => state.nav.destination.location.longitude && state.nav.destination.location.latitude && state.nav.destination.description  

export default navSlice.reducer