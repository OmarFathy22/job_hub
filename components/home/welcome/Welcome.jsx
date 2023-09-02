import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { useRouter } from "expo-router";
import { SIZES } from "../../../constants";
const jopTypes = ["Full Time", "Part Time", "Contractor"];
const Welcome = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = React.useState(jopTypes[0]);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Morata</Text>
        <Text style={styles.welcomeMessage}>Find Your Perfect Job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            style={styles.searchInput}
            placeholder="What are you looking for..."
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            router.push(`/search/${searchTerm}`);
          }}
        >
          <Image
            style={styles.searchBtnImage}
            resizeMode="contain"
            source={require("../../../assets/icons/search.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jopTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Welcome;
