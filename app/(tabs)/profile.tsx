import { Image, Text, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const profile = () => {
  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 items-center justify-center px-5 py-20 gap-3">
        <Image className="size-10 color-light-200" source={icons.person} />
        <Text className="font-bold text-2xl text-white">Profile</Text>
      </View>
    </View>
  );
};

export default profile;
