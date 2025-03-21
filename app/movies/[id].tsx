import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/custom-hooks/useFetch";
import { getMovieDetail } from "@/services/api";
import { images } from "@/constants/images";
import { convertToTime, formatNumber, formatDate } from "@/utils/methods";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value: string | number | string[] | null;
  fontSize?: string;
  isBox?: boolean;
}

const MovieInfo = ({ label, value, fontSize = "text-xs" }: MovieInfoProps) => {
  return (
    <View className="flex-1 items-start justify-center px-5 gap-y-1 pt-2">
      <Text className="text-balance text-light-300 font-bold">{label}</Text>
      <Text className={` ${fontSize} text-white font-normal`}>{value}</Text>
    </View>
  );
};

const MovieGeneras = ({
  label,
  value,
  fontSize = "text-xs",
  isBox = true,
}: MovieInfoProps) => {
  return (
    <View className="flex-1 items-start justify-center px-5 gap-y-2 pt-2">
      <Text className="text-balance text-light-300 font-bold">{label}</Text>
      <View className="flex-wrap flex-row gap-x-3">
        {/* Mapping over 'value' */}
        {Array.isArray(value) &&
          value.map((name, index) =>
            isBox ? (
              <View
                key={index} // Add a unique key for each mapped item
                className="self-start flex-row items-center justify-start px-2 py-1 bg-dark-100 rounded-lg mt-2"
              >
                <Text className={`${fontSize} text-white font-normal`}>
                  {name}
                </Text>
              </View>
            ) : (
              <View
                key={index} // Add a unique key for each mapped item
                className="self-start flex-row items-center justify-center py-1 mt-2 gap-x-2"
              >
                <Text className={`${fontSize} text-white font-normal`}>
                  {name}
                </Text>
                {index !== value.length - 1 && (
                  <Image
                    source={images.rankingGradient}
                    className="w-2 h-2 rounded-full mt-1"
                    resizeMode="stretch"
                  />
                )}
              </View>
            )
          )}
      </View>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => getMovieDetail(id as string));
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://placehold.co/600x400/1/1a1a1a/ffffff.png",
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 mx-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
        </View>
        <View className="flex-row items-center justify-start gap-x-2 px-5 py-2">
          <Text className="text-base text-light-200">
            {movie?.release_date.split("-")[0]}
          </Text>
          <Image
            source={images.rankingGradient}
            className="w-2 h-2 rounded-full mt-1"
            resizeMode="stretch"
          />
          <Text className="text-base text-light-200">
            {movie?.genres[0]?.name ?? NaN}
          </Text>
          <Image
            source={images.rankingGradient}
            className="w-2 h-2 rounded-full mt-1"
            resizeMode="stretch"
          />
          <Text className="text-base text-light-200">
            {convertToTime(movie?.runtime as number)}
          </Text>
          <Image
            source={images.rankingGradient}
            className="w-2 h-2 rounded-full mt-1"
            resizeMode="stretch"
          />
        </View>
        <View className="self-start flex-row items-center justify-start px-2 py-1 bg-dark-100 mx-5 rounded-lg mt-2 gap-x-1">
          <Image className="size-4" source={icons.star} />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(movie?.vote_average ?? 0)}/10
          </Text>
          <Text className="text-xs text-light-200 font-bold">
            ({formatNumber(Math.round(movie?.vote_count ?? 0))} votes)
          </Text>
        </View>
        <MovieInfo label="Overview" value={movie?.overview ?? "N/A"} />
        <View className="flex-row justify-between items-stretch">
          <MovieInfo
            label="Release Date"
            fontSize="text-xl"
            value={`${formatDate(
              movie?.release_date.toString() ?? "2025-12-08"
            )}`}
          />
          <MovieInfo
            label="Status"
            fontSize="text-xl"
            value={movie?.status ?? "N/A"}
          />
        </View>
        <View className="items-start justify-center py-1">
          <MovieGeneras
            label="Generas"
            fontSize="text-base"
            value={movie?.genres.map((item) => item.name) as string[]}
          />
        </View>
        <View className="items-start justify-center py-1">
          <MovieGeneras
            label="Countries"
            fontSize="text-lg"
            isBox={false}
            value={
              movie?.production_countries.map((item) => item.name) as string[]
            }
          />
        </View>
        <View className="flex-row justify-start items-start">
          <MovieInfo
            label="Budget"
            fontSize="text-xl"
            value={`$${formatNumber(movie?.budget ?? 0)}`}
          />
          <MovieInfo
            label="Revenue"
            fontSize="text-xl"
            value={`$${formatNumber(movie?.revenue ?? 0)}`}
          />
        </View>
        <MovieInfo
          label="Tagline"
          fontSize="text-xl"
          value={movie?.tagline ?? "N/A"}
        />
        <View className="items-start justify-center py-1">
          <MovieGeneras
            label="Production Companies"
            fontSize="text-lg"
            isBox={false}
            value={
              movie?.production_companies.map((item) => item.name) as string[]
            }
          />
        </View>
        <TouchableOpacity
          className="self-center flex-row bg-accent justify-center items-center rounded-lg py-3/5 w-[90%] mt-10"
          onPress={router.back}
        >
          <Text className="self-center font-bold px-2 py-3">
            Visit HomePage
          </Text>
          <Image source={icons.arrow} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
