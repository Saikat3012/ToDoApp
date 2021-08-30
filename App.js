
import React,{useState,useEffect} from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

//bring in all screens
import Home from './screens/Home'
import Add from './screens/Add'
import Edit from './screens/Edit'
import logo from './assets/logo.png'


const Stack  = createNativeStackNavigator ();

const App = () => {
  const [splash, setSplash] = useState( true )

  useEffect( () => {
    setTimeout(function(){ setSplash(false) }, 1500);
  },[])
  if ( splash ) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems:'center'
      }}>
        <Image source={logo} style={{
          height: 250,
          width: 250,
        }} />
        <Text style={{
          color: '#fff',
          fontSize: 30,
          fontStyle: 'italic',
        }}>ToDo App By Saikat</Text>
      </View>
    )
  }
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle:{
            backgroundColor: "#0f4c75"
          },
          title: 'ToDo App',
          headerTitleStyle: {
            textAlign: "center",
            color: "#00b7c2"
          }
        }}
        >

        </Stack.Screen>
        <Stack.Screen
        name="Add"
        component={Add}
        options={{
          headerStyle:{
            backgroundColor: "#0f4c75"
          },
          title: 'Add Tasks',
          headerTitleStyle: {
            textAlign: "center",
            color: "#00b7c2"
          }
        }}
        >

        </Stack.Screen>
        <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          headerStyle:{
            backgroundColor: "#0f4c75"
          },
          title: 'Edit Tasks',
          headerTitleStyle: {
            textAlign: "center",
            color: "#00b7c2"
          }
        }}
        >

        </Stack.Screen>
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default App;
