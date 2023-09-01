import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  Stack,
  useRouter,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import fetchData from "../../utils/newRequst";
import { useQuery } from "@tanstack/react-query";
const tabs = ["About", "Qualifications", "Responsibilities"];
const JobDetails = () => {
  useEffect(() => {
    console.log(local);
  }, []);
  const router = useRouter();
  const local = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(true); // New state variable
  const onRefresh = () => {};
  const { error, data } = useQuery(
    ["jobDetails"],
    () => fetchData("job-details", { job_id: local.id }),
    {
      onSuccess: () => {
        setLoading(false);
      },
    }
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data?.length === 0 ? (
          <Text>No data found</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0]?.employer_logo}
              jobTitle={data[0]?.job_title}
              companyName={data[0]?.employer_name}
              location={data[0]?.job_country}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {activeTab === tabs[0] && <View />}
            {activeTab === tabs[1] && (
              <Specifics
                title="Qualifications"
                points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
              />
            )}
            {activeTab === tabs[2] && <View />}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;
