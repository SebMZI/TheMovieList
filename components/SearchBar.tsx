import { Image, StyleSheet, TextInput, View } from "react-native"


const SearchBar = () => {
    function handleSearch(text: string){
        console.log(text)
    }
  return (
    <View style={styles.search_bar}>
        <Image source={require("../assets/images/icons/icon_search_grey.png")} style={{width: 24, height: 24}}/>
        <TextInput onChangeText={handleSearch} placeholder="Wednesday, Minecraft..." placeholderTextColor={"#FFFFFF80"} style={styles.search_bar__input}/>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    search_bar: {
        backgroundColor: '#414040',
        marginInline: 16,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingInline: 12
    },
    search_bar__input:{
        fontSize: 16,
        color: 'white',
        padding: 12,
        flex: 1,
    },
})