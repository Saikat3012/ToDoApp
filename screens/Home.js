import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    ScrollView,
    FlatList,
    View,
    TouchableOpacity
} from 'react-native'
import {
    List,
    ListItem,
    Left,
    Text,
    Button,
    Body, 
    Right,
    CheckBox,
    Title,
    H1,
    Fab,
    Subtitle,
    Container,
    Spinner,
    NativeBaseProvider,
    Input
} from 'native-base'
import  Icon  from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native'

const Home = ({navigation, route}) => {
    const [listOfSeasons, setListOfSeasons] = useState([])
    const [loading, setLoading] = useState( false )
    const [search, setSearch] = useState( '' )
    const [listToDisplay, setListToDisplay] = useState([])
    
    const Item = ( {each}  ) => {
        return (
            
        <ListItem  style={styles.listItem} noBorder>
            <Left>
                <Button
                style={styles.actionButton}
                danger
                onPress={() => deleteSeason(each.id)}
                >
                    <Icon name="trash-o" size={30} color="#900"/>
                </Button>
                <Button
                style={styles.actionButton}
                onPress={() => {
                    navigation.navigate('Edit', {each})
                }}
                >
                    <Icon name="pencil" size={30} color="#900" />
                </Button>
            </Left>
            <Body>
                <Title style={[styles.seasonName,{textDecorationLine:each.isWatched ? 'line-through' : 'none'}]}>{each.name}</Title>
                <Text  note> {each.catagory}</Text>
            </Body>
            <Right>
                <CheckBox
                checked={each.isWatched}
                onPress={() => markComplete(each.id)}
                />
            </Right>
        </ListItem>
        )
    }
        
    
    const renderItem = ({ item }) => (
    <Item each={item} />
    );
    

    const isFocused = useIsFocused()

    const getList = async () => {
        setLoading(true)

        const storedValue = await AsyncStorage.getItem('@season_list');

        if (!storedValue) {
            setListOfSeasons([])
        }

        const list = JSON.parse(storedValue)
        setListOfSeasons( list )
        setListToDisplay( list )
        setSearch('')

        setLoading(false)

    }

    const deleteSeason = async (id) => {
        const newList = await listOfSeasons.filter((list) => list.id !== id)
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));

        setListOfSeasons( newList )
        setSearch( '' )
        setListToDisplay(newList)
    }

    const markComplete = async (id) => {
        const newArr = listOfSeasons.map((list) => {
            if (list.id == id) {
                list.isWatched = !list.isWatched
            }
            return list
        })

        await AsyncStorage.setItem('@season_list', JSON.stringify(newArr))
        setListOfSeasons( newArr )
        setSearch( '' )
        setListToDisplay(newArr)
    }

    const handleSearch = (text) => {
        setSearch(text)
        const tempArr = listOfSeasons
        if ( text == '' ) {
            setListToDisplay(listOfSeasons)
        } else {
            const result = tempArr.filter( ( each ) => {
                return ((each.name+each.catagory).toLowerCase()).includes(text.toLowerCase())
            } )
            setListToDisplay(result)
        }
        
    }

    useEffect(() => {
        getList();
    }, [isFocused])

    if (loading) {
        return(
            <Container style={styles.container}>
                <Spinner color="#00b7c2" />
            </Container>
        )
    }

    return (
        <View style={styles.container}>
            {!listOfSeasons ? (
                    <Container style={styles.container}>
                        <H1 style={styles.heading}>
                            No Tasks to do
                        </H1>
                    </Container>
            ) : (
                <>
                        <H1 style={styles.heading}>Taks to do</H1>
                        <View style={{
                            width: '95%',
                            height: 50,
                            marginBottom:'2%',
                            backgroundColor: '#859',
                            alignSelf: 'center',
                            borderRadius: 25,
                            flexDirection: 'row',
                            alignItems:'center'
                        }}>
                         <Input   placeholder="Task"
                        style={{color: "#eee",textAlign:'center'}}
                        value={search}
                        onChangeText={(text) => handleSearch(text)}/>
                        </View>
                        
                        <FlatList
                            data={listToDisplay}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                </>
            )}

            
            
            
            <Fab
            style={{backgroundColor: "#5067FF"}}
            position="bottomRight"
            onPress={() => navigation.navigate('Add')}
            >
                <Icon name="plus" size={30} color="#900" />
            </Fab>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
        flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
        padding:8,
        marginLeft: 5,
    },
    seasonName: {
      color: '#150281',
        textAlign: 'justify',
      
    },
    listItem: {
        marginBottom: 20,
        width: '95%',
        marginHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: '#7BB43A'
    },
    eachTaksContainer: {
        flexDirection: 'row',
        width: '95%',
        backgroundColor: '#7BB',
        marginVertical: 5,
        alignSelf:'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius:10
    }
  });