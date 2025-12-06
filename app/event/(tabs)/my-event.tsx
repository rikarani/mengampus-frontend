import { useEffect, useState } from "react";

import { FlatList, Text, View } from "react-native";

import { Button, Card } from "heroui-native";

import { API_HOST } from "@/constants";

type Event = {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
};

const formatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function MyEventScreen(): React.JSX.Element {
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
  }, []);

  return isLoading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <FlatList
      data={events}
      keyExtractor={(event) => event.id}
      renderItem={({ item, index }) => (
        <Card className={`rounded-none ${index === events.length - 1 ? undefined : "mb-4"}`}>
          <Card.Header>
            <Text className="text-white">
              {formatter.format(new Date(item.date))} - {item.category}
            </Text>
            <Text className="text-white">{item.location}</Text>
          </Card.Header>
          <Card.Body>
            <Card.Label>{item.name}</Card.Label>
            <Card.Description>{item.description}</Card.Description>
          </Card.Body>
          <Card.Footer>
            <View className="flex flex-row gap-2">
              <Button className="flex-1">
                <Text>Lihat Detail Event</Text>
              </Button>
              <Button className="flex-1">
                <Text>Enroll Event</Text>
              </Button>
            </View>
          </Card.Footer>
        </Card>
      )}
    />
  );
}
