import { useEffect, useState } from "react";
import { View } from "react-native";

import { Redirect, Tabs } from "expo-router";

import { auth } from "@/lib/auth";

import { ProfileButton } from "@/components/profile";
import { AddEventModal } from "@/components/modal/event/add";

export default function EventLayout(): React.JSX.Element {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { data: session } = auth.useSession();

  useEffect(() => {
    (() => {
      if (session) {
        (async () => {
          const result = await auth.admin.hasPermission({
            userId: session.user.id,
            permission: { event: ["create"] },
          });

          if (result.error) {
            setHasPermission(false);
          } else {
            setHasPermission(result.data.success);
          }
        })();
      }
    })();
  }, [session]);

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="my-event" options={{ title: "My Events", headerRight: () => <ProfileButton /> }} />
      <Tabs.Screen
        name="all-event"
        options={{
          title: "All Events",
          headerRight: () => (
            <View className="flex flex-row gap-4 items-center">
              {hasPermission && <AddEventModal />}
              <ProfileButton />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
