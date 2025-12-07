import { useState } from "react";
import { View, KeyboardAvoidingView, Text, TextInput } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEventSchema, type AddEventSchema } from "@/schemas/event/add";

import { Dialog, Button, TextField } from "heroui-native";

export const AddEventModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddEventSchema>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      name: "",
      date: new Date(),
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
          <Dialog.Overlay />
          <KeyboardAvoidingView behavior="padding">
            <Dialog.Content>
              <View>
                <Dialog.Label className="mb-4">Tambah Event</Dialog.Label>
                <TextField className="mb-4">
                  <Text className="text-white">Judul Event</Text>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Masukkan nama event"
                        className="px-3 py-2.5 border rounded-lg bg-[#E5E7EB]"
                      />
                    )}
                  />
                </TextField>
                <TextField className="mb-4">
                  <Text className="text-white">Tanggal Event</Text>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { onBlur, onChange, value } }) => <DatePicker date={new Date(value)} />}
                  />
                </TextField>
                <TextField className="mb-4">
                  <Text className="text-white">Kategori Event</Text>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Masukkan nama event"
                        className="px-3 py-2.5 border rounded-lg bg-[#E5E7EB]"
                      />
                    )}
                  />
                </TextField>
                <TextField className="mb-4">
                  <Text className="text-white">Deskripsi</Text>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Masukkan nama event"
                        className="px-3 py-2.5 border rounded-lg bg-[#E5E7EB]"
                      />
                    )}
                  />
                </TextField>
                <TextField className="mb-4">
                  <Text className="text-white">Lokasi</Text>
                  <Controller
                    control={control}
                    name="location"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Masukkan nama event"
                        className="px-3 py-2.5 border rounded-lg bg-[#E5E7EB]"
                      />
                    )}
                  />
                </TextField>
              </View>
              <View className="flex-row justify-end gap-3">
                <Button size="sm">gaskann</Button>
              </View>
            </Dialog.Content>
          </KeyboardAvoidingView>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
};
