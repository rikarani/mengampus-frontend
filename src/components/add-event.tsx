import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";

import { addEventSchema, type AddEventSchema } from "@/schemas/event/add";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, Dialog, ErrorView, TextField } from "heroui-native";

import { API_HOST } from "@/constants";
import { dateFormatter, timeFormatter } from "@/lib/formatter";
import type { Category } from "@/types";

const setDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;

  return `${year}-${month}-${day}`;
};

const setTime = (date: Date) => {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
};

export const AddEventModal = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_HOST}/categories`);

      const data = await response.json();

      setCategories(data.data);
    })();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddEventSchema>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      name: "",
      date: "",
      time: "",
      category: "",
      description: "",
      location: "",
    },
  });

  return (
    <View>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <AntDesign name="plus-circle" size={32} color="black" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/40" />
          <KeyboardAvoidingView behavior="padding">
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
                            <Text className="flex-1 text-black">
                              {value ? timeFormatter(new Date(value)) : "Pilih waktu"}
                            </Text>
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
                      name="category"
                      render={({ field: { onChange, value } }) => (
                        <View className="border px-1 border-gray-300 rounded-xl bg-gray-100">
                          <Picker selectedValue={value} onValueChange={onChange} dropdownIconColor="#000">
                            {categories.map((category) => (
                              <Picker.Item key={category.id} label={category.name} value={category.id} />
                            ))}
                          </Picker>
                        </View>
                      )}
                    />
                  </TextField>
                  <ErrorView isInvalid={!!errors?.category}>{errors?.category?.message}</ErrorView>
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
                  <Button onPress={handleSubmit((data) => console.log({ data }))} size="sm">
                    Gaskann
                  </Button>
                </View>
              </Dialog.Content>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
};
