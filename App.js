import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView className='flex-1' >
      <NavigationContainer>
        <Provider store={store}>
          <SafeAreaProvider>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0} className='flex-1'>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ 
                  headerShown: false
                }} />
                <Stack.Screen name="Map" component={MapScreen} options={{
                  headerShown: false
                }} />
              </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}