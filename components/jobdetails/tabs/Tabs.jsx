import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import styles from "./tabs.style";
import { SIZES } from "../../../constants";

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
  <TouchableOpacity
    style={styles.btn(name, activeTab)}
    onPress={onHandleSearchType}
  >
    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
);

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small / 5 }}
      />
    </SafeAreaView>
  );
};

export default Tabs;
