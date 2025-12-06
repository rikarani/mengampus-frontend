import { router } from "expo-router";
import { Text, View } from "react-native";

import { Button } from "heroui-native";

import { auth } from "@/lib/auth";

import { StyledSafeAreaView } from "@/components/styled/StyledSafeAreaView";

export default function ProfilePage(): React.JSX.Element {
  return (
    <StyledSafeAreaView>
      <Text>Profile Page</Text>
      <Text>This is the profile page of the dashboard.</Text>
      <View>
        <Button onPress={() => router.push("/event/(tabs)/my-event")}>
          <Text className="text-white">Click me!</Text>
        </Button>
        <Button variant="destructive" onPress={() => auth.signOut()}>
          <Text className="text-white">Logout bang</Text>
        </Button>
      </View>
    </StyledSafeAreaView>
  );
}
