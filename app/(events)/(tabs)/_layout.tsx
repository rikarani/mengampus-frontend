import { Tabs } from "expo-router";

export default function TabLayout(): React.JSX.Element {
  return (
    <Tabs>
      <Tabs.Screen
        name="my-events"
        options={{ title: "Event Saya", headerShown: false }}
      />
      <Tabs.Screen name="all-events" options={{ title: "Semua Event" }} />
    </Tabs>
  );
}
