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
import About from "../../components/jobdetails/about/About";
const tabs = ["About", "Qualifications", "Responsibilities"];
const JobDetails = () => {
  const router = useRouter();
  const local = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [jobApplyLink, setjobApplyLink] = useState(
    "https://careers.google.com/jobs/results"
  );
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(true); // New state variable
  const { error, data, refetch } = useQuery(
    ["jobDetails"],
    () => fetchData("job-details", { job_id: local.id }),
    {
      onSuccess: () => {
        setLoading(false);
        setjobApplyLink(data[0]?.job_apply_link);
      },
    }
  );
  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
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
            {activeTab === tabs[0] && (
              <About info={data[0]?.job_description ?? "No data provided"} />
            )}
            {activeTab === tabs[1] && (
              <Specifics
                title="Qualifications"
                points={data[0]?.job_highlights?.Qualifications ?? ["N/A"]}
              />
            )}
            {activeTab === tabs[2] && (
              <Specifics
                title="Responsibilities"
                points={
                  data[0]?.job_highlights?.Responsibilities ??
                  "No data provided"
                }
              />
            )}
          </View>
        )}
      </ScrollView>
      <JobFooter url={jobApplyLink} />
    </SafeAreaView>
  );
};

export default JobDetails;
