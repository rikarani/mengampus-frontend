import { Text, Pressable } from "react-native";

import { StyledSafeAreaView } from "@/components/styled/StyledSafeAreaView";
import { auth } from "@/lib/auth";

export default function ProfilePage(): React.JSX.Element {
  return (
    <StyledSafeAreaView>
      <Text>Profile Page</Text>
      <Text>This is the profile page of the dashboard.</Text>
      <Pressable onPress={() => auth.signOut()}>
        <Text>Logout njir</Text>
      </Pressable>
    </StyledSafeAreaView>
  );
}
