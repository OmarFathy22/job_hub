import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import styles from "./screenheader.style";

const ScreenHeaderBtn = ({ iconUrl, dimension }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={() => router.back()}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
