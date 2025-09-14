import { addToDatabase } from "@/appwrite";
import { useMovie } from "@/context/MovieContext";
import useDebounce from "@/hooks/useDebounce";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const { height } = Dimensions.get("window");

const SearchBar = ({ fetchMovie }: Props) => {
  const { setSelectedMovie } = useMovie();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      if (!debouncedSearchTerm) {
        setResults([]);
        return;
      }

      try {
        const movieResults = await fetchMovie(debouncedSearchTerm);
        setResults(movieResults ?? []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setResults([]);
      }
    };
    getResults();
  }, [debouncedSearchTerm]);

  return (
    <View style={styles.search_bar}>
      <Image
        source={require("../assets/images/icons/icon_search_grey.png")}
        style={{ width: 24, height: 24 }}
      />
      <TextInput
        autoCorrect={false}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        placeholder="Wednesday, Minecraft..."
        placeholderTextColor={"#FFFFFF80"}
        style={styles.search_bar__input}
        onPress={() => setSearchTerm("")}
      />
      
      {results.length > 0 && (
        <ScrollView style={[styles.search_bar_results, { maxHeight: height * 0.5 }]}>
          {results.map((result, index) => (
            <Link href="/modal" asChild key={index} style={{ marginBottom: 3 }}>
              <TouchableOpacity
                onPress={async () => {
                   await addToDatabase(result);  
                  setSelectedMovie(result);
                  setSearchTerm("");
                }}
              >
                <View style={styles.result_item}>
                  <Image
                    source={{
                      uri: result?.poster_url || result?.poster_path,
                    }}
                    style={styles.result_image}
                  />
                  <View>
                    <Text style={styles.result_title}>
                      {result?.title || result?.name || "No title"}
                    </Text>
                    <View style={styles.result_stars}>
                      {Array.from({
                        length: Math.round(result.vote_average),
                      }).map((_, index) => (
                        <Image
                          key={index}
                          source={require("../assets/images/icons/icon_star_yellow.png")}
                          style={styles.star_icon}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  search_bar: {
    backgroundColor: "#414040",
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    position: "relative",
    zIndex: 20,
  },
  search_bar__input: {
    fontSize: 16,
    color: "white",
    padding: 12,
    flex: 1,
  },
  search_bar_results: {
    position: "absolute",
    top: "110%",
    left: 0,
    right: 0,
    backgroundColor: "#414040",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  result_item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 6,
  },
  result_image: {
    aspectRatio: 2 / 3,
    borderRadius: 4,
    width: 40,
  },
  result_title: {
    color: "white",
    fontWeight: "700",
  },
  result_stars: {
    flexDirection: "row",
    marginTop: 2,
  },
  star_icon: {
    width: 16,
    height: 16,
  },
});
