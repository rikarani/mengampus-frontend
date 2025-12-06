import { FC } from "react";
import { Image, Pressable } from "react-native";

import { router } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ProfileButton: FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <Pressable onPress={() => router.push("/dashboard/profile")}>
      <Image
        source={{ uri: "https://placehold.co/600x400/png" }}
        style={{ marginRight: insets.right || 16 }}
        className="size-9 rounded-full"
      />
    </Pressable>
  );
};
