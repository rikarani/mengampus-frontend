import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import AntDesign from "@expo/vector-icons/AntDesign";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, Dialog, ErrorView, TextField, useToast } from "heroui-native";

import { API_HOST } from "@/constants";
import { auth } from "@/lib/auth";
import { dateFormatter } from "@/lib/formatter";
import { addEventSchema } from "@/schemas/event/add";

import type { AddEventSchema } from "@/schemas/event/add";
import type { Category } from "@/types";

const setTime = (date: Date) => {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
};

export const AddEventModal = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_HOST}/categories`, {
        credentials: "omit",
        headers: {
          Cookie: auth.getCookie(),
        },
      });

      const data = await response.json();

      setCategories(data.data);
    })();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddEventSchema>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      category_id: "",
      name: "",
      date: "",
      time: "",
      description: "",
      location: "",
    },
  });

  const addEvent = async (data: AddEventSchema) => {
    const hit = await fetch(`${API_HOST}/events/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!hit.ok) {
      toast.show({
        variant: "danger",
        label: "Gagal Menambahkan Event",
        description: "Terjadi kesalahan saat menambahkan event",
      });
    } else {
      toast.show({
        variant: "success",
        label: "Berhasil Menambahkan Event",
        description: "Event berhasil ditambahkan",
      });

      reset();
      setIsOpen(false);
    }
  };

  return (
    <View>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <AntDesign name="plus-circle" size={32} color="black" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/40" />
          <SafeAreaView>
            <Dialog.Content className="bg-white p-6 rounded-2xl shadow-lg">
              <Dialog.Label className="text-xl font-semibold text-black mb-4">Tambah Event</Dialog.Label>
              <View className="mb-4">
                <TextField className="mb-1">
                  <Text className="text-black mb-1">Judul Event</Text>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Masukkan nama event"
                        className="px-3 py-3 border border-gray-300 rounded-xl bg-gray-100 text-black"
                      />
                    )}
                  />
                </TextField>
                <ErrorView isInvalid={!!errors?.name}>{errors?.name?.message}</ErrorView>
              </View>
              <View className="mb-4">
                <TextField className="mb-1">
                  <Text className="text-black mb-1">Tanggal Event</Text>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Pressable
                          onPress={() => setShowDatePicker(true)}
                          className="flex-row items-center border border-gray-300 rounded-xl px-3 py-3 bg-gray-100"
                        >
                          <Text className="flex-1 text-black">
                            {value ? dateFormatter(new Date(value)) : "Pilih tanggal"}
                          </Text>
                          <AntDesign name="calendar" size={22} color="black" />
                        </Pressable>
                        {showDatePicker && (
                          <DateTimePicker
                            mode="date"
                            display="default"
                            value={value ? new Date(value) : new Date()}
                            onChange={(event, date) => {
                              setShowDatePicker(false);
                              if (event.type !== "dismissed") {
                                onChange(date?.toLocaleDateString("en-CA"));
                              }
                            }}
                          />
                        )}
                      </>
                    )}
                  />
                </TextField>
                <ErrorView isInvalid={!!errors?.date}>{errors?.date?.message}</ErrorView>
              </View>
              <View className="mb-4">
                <TextField className="mb-1">
                  <Text className="text-black mb-1">Waktu Event</Text>
                  <Controller
                    control={control}
                    name="time"
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Pressable
                          onPress={() => setShowTimePicker(true)}
                          className="flex-row items-center border border-gray-300 rounded-xl px-3 py-3 bg-gray-100"
                        >
                          <Text className="flex-1 text-black">{value ? value : "Pilih waktu"}</Text>
                          <AntDesign name="clock-circle" size={24} color="black" />
                        </Pressable>
                        {showTimePicker && (
                          <DateTimePicker
                            mode="time"
                            display="default"
                            value={value ? new Date(value) : new Date()}
                            onChange={(event, date) => {
                              setShowTimePicker(false);
                              if (event.type !== "dismissed") {
                                onChange(setTime(date!));
                              }
                            }}
                          />
                        )}
                      </>
                    )}
                  />
                </TextField>
                <ErrorView isInvalid={!!errors?.time}>{errors?.time?.message}</ErrorView>
              </View>
              <View className="mb-4">
                <TextField className="mb-1">
                  <Text className="text-black mb-1">Kategori Event</Text>
                  <Controller
                    control={control}
                    name="category_id"
                    render={({ field: { onChange, value } }) => (
                      <View className="border px-1 border-gray-300 rounded-xl bg-gray-100">
                        <Picker selectedValue={value} onValueChange={onChange} dropdownIconColor="#000">
                          <Picker.Item label="Pilih kategori" value="" enabled={false} />
                          {categories.map((category) => (
                            <Picker.Item key={category.id} label={category.name} value={category.id} />
                          ))}
                        </Picker>
                      </View>
                    )}
                  />
                </TextField>
                <ErrorView isInvalid={!!errors?.category_id}>{errors?.category_id?.message}</ErrorView>
              </View>
              <View className="mb-4">
                <TextField className="mb-1">
                  <Text className="text-black mb-1">Deskripsi</Text>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Masukkan deskripsi"
                        multiline
                        className="px-3 py-3 border border-gray-300 rounded-xl bg-gray-100 text-black"
                      />
                    )}
                  />
                </TextField>
                <ErrorView isInvalid={!!errors?.description}>{errors?.description?.message}</ErrorView>
              </View>
              <View className="mb-4">
                <TextField className="mb-1">
                  <Text className="text-black mb-1">Lokasi</Text>
                  <Controller
                    control={control}
                    name="location"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Masukkan lokasi"
                        className="px-3 py-3 border border-gray-300 rounded-xl bg-gray-100 text-black"
                      />
                    )}
                  />
                  <ErrorView isInvalid={!!errors?.location}>{errors?.location?.message}</ErrorView>
                </TextField>
              </View>
              <View className="flex-row justify-end mt-2">
                <Button onPress={handleSubmit((data) => addEvent(data))} size="sm">
                  Gaskann
                </Button>
              </View>
            </Dialog.Content>
          </SafeAreaView>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
};
