import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/custom-hooks/useFetch";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    resetData,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        resetData();
      }
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies ? movies[0] : null);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => `s${item.id.toString()}`}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10 mx-auto" />
            </View>
            <View className="my-5 mx-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(value: string) => setSearchQuery(value)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3 self-center"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 py-3">
                Error : {error?.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl font-bold text-white px-5">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-xl font-bold text-gray-500 px-5 text-center">
                {searchQuery.trim() ? (
                  <>
                    No Movies found for{" "}
                    <Text className="text-accent">{searchQuery}</Text>
                  </>
                ) : (
                  "Search for movies"
                )}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;
