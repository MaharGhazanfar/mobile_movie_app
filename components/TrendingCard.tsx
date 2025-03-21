import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import React from "react";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { images } from "@/constants/images";

const TrendingCard = ({
  movie: { movie_id, title, count, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: poster_url
              ? poster_url
              : "https://placehold.co/600x400/1/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-6xl text-white font-bold uppercase ml-2 mt-2">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text className="text-xs text-light-200 font-bold uppercase mt-1 text-center">
          {title}
        </Text>
        {/*<View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium uppercase mt-1">
            {release_date.split("-")[0]}
          </Text>
          <Text className="text-xs text-light-300 font-medium uppercase mt-1">
            Movie
          </Text>
        </View> */}
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({});
