import { Redirect } from "expo-router";

export default function AllEvents(): React.JSX.Element {
  return <Redirect href="/(events)/(tabs)/my-events" />;
}
