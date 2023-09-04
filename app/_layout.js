import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();
const Layout = () => {
  const queryClient = new QueryClient();
  const [fontsloaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsloaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsloaded]);
  if (!fontsloaded) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <Stack onLayout={onLayoutRootView} />
    </QueryClientProvider>
  );
};
export default Layout;
