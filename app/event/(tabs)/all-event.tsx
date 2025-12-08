import { useEffect, useState } from "react";

import { FlatList, Text, View } from "react-native";

import { Button, Card } from "heroui-native";

import { API_HOST } from "@/constants";
import type { Event } from "@/types";

import { auth } from "@/lib/auth";
import { dateFormatter } from "@/lib/formatter";

import { DeleteEvent } from "@/components/modal/event/delete";

export default function AllEventScreen(): React.JSX.Element {
  const { data: session } = auth.useSession();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_HOST}/events`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
        setIsLoading(false);
      }
    })();
  }, [events]);

  return isLoading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : events.length === 0 ? (
    <View className="flex-1 justify-center items-center">
      <Text>Kosong</Text>
    </View>
  ) : (
    <FlatList
      className="p-4"
      data={events}
      keyExtractor={(event) => event.id}
      renderItem={({ item, index }) => (
        <Card
          className={`bg-white rounded-xl border border-gray-200 p-4 ${index !== events.length - 1 ? "mb-4" : "mb-8"}`}
        >
          {/* Header */}
          <Card.Header className="mb-4 p-0">
            <View className="gap-2">
              {/* Category */}
              <View className="self-start bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-blue-700 text-xs font-semibold">{item.category.name}</Text>
              </View>

              {/* Date & Location */}
              <View className="mt-1">
                <Text className="text-gray-900 font-medium">
                  {dateFormatter(new Date(item.date))} — {item.time}
                </Text>
                <Text className="text-gray-600 text-sm mt-1">{item.location}</Text>
              </View>
            </View>
          </Card.Header>

          {/* Body */}
          <Card.Body className="mb-4 p-0">
            <Text className="text-lg font-semibold text-gray-900 mb-2">{item.name}</Text>
            <Text className="text-gray-600 leading-relaxed">{item.description}</Text>
          </Card.Body>

          {/* Footer */}
          <Card.Footer className="p-0">
            <View className="flex flex-row gap-3">
              <Button className="flex-1 bg-blue-600">
                <Text className="text-white text-center font-medium">Lihat Detail</Text>
              </Button>

              <DeleteEvent event={item} />
            </View>
          </Card.Footer>
        </Card>
      )}
    />
  );
}
