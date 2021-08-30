import React, {useState, useEffect} from 'react'
import { ScrollView, StyleSheet} from 'react-native'
import {
    List,
    ListItem,
    Left,
    Text,
    Button,
    Icon, 
    Body, 
    Right,
    CheckBox,
    Title,
    H1,
    Fab,
    Subtitle,
    Container,
    Spinner,
    Form,
    Item,
    Input
} from 'native-base'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {

    const [name, setName] = useState('')
    const [catagory, setCatagory] = useState('')
    const [id, setId] = useState(null)

    const update = async () => {
        try {
            if (!name || !catagory) {
                return alert("Please enter value in both field")
                //TODO: add snackbar here
            }

            const seasontoUpdate = {
                id,
                name, 
                catagory,
                isWatched: false
            }

            const storedValue = await AsyncStorage.getItem('@season_list')
            const list = await JSON.parse(storedValue)
            
            list.map((singleSeason) => {
                if (singleSeason.id == id) {
                    singleSeason.name = name;
                    singleSeason.catagory = catagory;
                }
                return singleSeason;
            })

            await AsyncStorage.setItem('@season_list', JSON.stringify(list))

            navigation.navigate("Home");


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const {each} = route.params
        const {id, name, catagory} = each

        setId(id)
        setName(name)
        setCatagory(catagory)

    }, [])

    return(
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <H1 style={styles.heading}>Add to watch List</H1>
                <Form>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Season name"
                        style={{color: "#eee"}}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        />
                    </Item>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Catagory"
                        style={{color: "#eee"}}
                        value={catagory}
                        onChangeText={(text) => setCatagory(text)}
                        />
                    </Item>
                    <Button rounded block 
                    onPress={update}
                    >
                        <Text style={{color: "#eee"}}>Update</Text>
                    </Button>
                </Form>
            
            </ScrollView>
        </Container>
    )
}

export default Edit



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });