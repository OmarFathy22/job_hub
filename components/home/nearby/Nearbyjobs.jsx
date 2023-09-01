import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import { useRouter } from "expo-router";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useQuery } from "@tanstack/react-query";
import fetchjobs from "../../../utils/newRequst";
const NearbyJobs = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["jobs"],
    queryFn: () =>
      fetchjobs("search", { query: "React developer", num_pages: 1 }),
  });
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard key={`nearby-job-${job?.job_id}`} job={job} />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
