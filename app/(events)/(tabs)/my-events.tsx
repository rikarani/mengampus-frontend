import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

function Empty() {
  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyText}>Anda belum mendaftar event apapun</Text>
      {/*<TouchableOpacity
            style={styles.outlined}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.outlinedText}>Lihat Event Tersedia</Text>
          </TouchableOpacity>*/}
    </View>
  );
}

const formatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function MyEvents(): React.JSX.Element {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.43.60:4000/events");
      const data = await response.json();

      setEvents(data.data);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/*<TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Kembali</Text>
            </TouchableOpacity>*/}
        <Text style={styles.headerTitle}>Event Saya</Text>
        <Text style={{ fontSize: 13, color: "#6B7280" }}>
          Event yang sudah Anda daftarkan
        </Text>
      </View>

      {events.length === 0 ? (
        <Empty />
      ) : (
        <View>
          {events.map((event) => (
            <View
              key={event.id}
              className="border-2  border-red-500 border-dashed p-4"
            >
              <View className="flex flex-row justify-between">
                <Text className="font-bold text-2xl flex-1">{event.title}</Text>
                <Text className="bg-gray-200">{event.category}</Text>
              </View>
              <View className="my-2">
                <Text>{formatter.format(new Date(event.date))}</Text>
                <Text>{event.location}</Text>
              </View>
              <View>
                <Text>{event.description}</Text>
                <Link href="/register">
                  <Text>Lihat Detail</Text>
                </Link>
              </View>
            </View>
          ))}
        </View>
      )}

      {/*{events.length === 0 ? (
            <View style={{ padding: 16 }}>{renderEmpty()}</View>
          ) : (
            <FlatList
              contentContainerStyle={{ padding: 16 }}
              data={events}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          )}*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 20, fontWeight: "600", marginTop: 12 },
  emptyCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  emptyText: { marginBottom: 16 },
  outlined: {
    borderWidth: 1,
    borderColor: "#111827",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  outlinedText: { fontWeight: "500" },
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: { fontSize: 16, fontWeight: "600" },
  sub: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  status: { marginTop: 8, fontWeight: "500", color: "#2563EB" },
});
