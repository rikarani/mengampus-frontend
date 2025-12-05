import { Tabs } from "expo-router";

export default function DashboardLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(event)/my-event" />
      <Tabs.Screen name="(event)/all-event" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
