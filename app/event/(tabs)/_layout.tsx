import { Tabs } from "expo-router";

export default function EventLayout(): React.JSX.Element {
  return (
    <Tabs>
      <Tabs.Screen name="my-event" options={{ title: "My Events" }} />
      <Tabs.Screen name="all-event" options={{ title: "All Events" }} />
    </Tabs>
  );
}
