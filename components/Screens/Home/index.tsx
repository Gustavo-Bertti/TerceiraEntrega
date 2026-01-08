import PostagemComponent from "@/components/Postagem";
import api from "@/config/api/api";
import { Colors } from "@/constants/theme";
import { Postagem } from "@/types/Postagem";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";

const Home = () => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    
   

    const [query, setQuery] = useState('');
    const [postagens, setPostagens] = useState<Postagem[]>([]);

     const getPostagens = async () => {
        const response = await api.get<Postagem[]>('/postagem')
        if (response.data)setPostagens(response.data);

    }

    const handlerSearch = (text: string) => {
      if(text !== ''){
      api.get<Postagem[]>(`postagem/search?termo=${text}`)
        .then(response => {
          setPostagens(response.data);
        })
      }
      else{
        getPostagens();
      }
       
    }

     useFocusEffect(
            useCallback(() => {
                getPostagens();
            }, [])
        );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Feed</Text>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}>Veja as últimas postagens</Text>
      </View>

        <View style={styles.searchWrapper}>
          <TextInput
            style={[
              styles.searchInput,
              {
                backgroundColor: colorScheme === 'dark' ? '#111827' : '#f3f4f6',
                borderColor: colors.tint,
                color: colors.text,
              }
            ]}
            placeholder="Pesquise um post"
            placeholderTextColor={colors.icon}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              handlerSearch(text);
            }}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      <ScrollView 
        style={styles.feedContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {postagens.filter(postagem => postagem.ativo).map((postagem) => (
            <PostagemComponent key={postagem.id} postagem={postagem}/>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  feedContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 15,
  },
 
});
export default Home;