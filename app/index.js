import { useState } from "react";
import { View,Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import {QueryClient , QueryClientProvider} from "@tanstack/react-query"
const queryClient = new QueryClient()
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {
  const router = useRouter();
  return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
              ),
              headerRight: () => (
                <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
              ),
              headerTitle: "",
            }}
          />
          <ScrollView showsHorizontalScrollIndicator={false} padding = {SIZES.medium}>
            <Welcome />
            <Popularjobs />
            <Nearbyjobs />
          </ScrollView>
        </SafeAreaView>
      </QueryClientProvider>
  );
};
export default Home;
