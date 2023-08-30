import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import { useRouter } from "expo-router";
import PopularJobsCard from "../../common/cards/popular/PopularJobCard";
import { useQuery } from "@tanstack/react-query";
import fetchjobs from "../../../utils/newRequst";
const Popularjobs = () => {
  const { isLoading, error, data: jobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchjobs,
  });
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={jobs}
            renderItem={({ item }) => <PopularJobsCard item={item} />}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
