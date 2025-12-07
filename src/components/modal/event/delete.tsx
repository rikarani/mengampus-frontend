import { useState } from "react";

import { View } from "react-native";

import { Button, Dialog, useToast } from "heroui-native";

import { API_HOST } from "@/constants";
import type { Event } from "@/types";

type Props = {
  event: Event;
};

export const DeleteEvent = ({ event }: Props) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    const hit = await fetch(`${API_HOST}/events/delete/${event.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!hit.ok) {
      toast.show({
        variant: "danger",
        label: "Gagal Hapus Event",
        description: "Terjadi kesalahan saat menghapus event.",
      });
    } else {
      toast.show({
        variant: "success",
        label: "Berhasil Hapus Event",
        description: `Event ${event.name} berhasil dihapus.`,
      });
    }

    setIsOpen(false);
  };

  return (
    <View>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <Button variant="destructive">Hapus Event</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <View className="mb-5 gap-1.5">
              <Dialog.Label>Konfirmasi Hapus</Dialog.Label>
              <Dialog.Description>Yakin Mau Hapus Event {event.name}?</Dialog.Description>
            </View>
            <View className="flex-row justify-end gap-3">
              <Button size="sm" onPress={handleDelete}>
                Hapus
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
};
