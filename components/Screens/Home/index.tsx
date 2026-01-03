import PostagemComponent from "@/components/Postagem";
import { Colors } from "@/constants/theme";
import { Postagem } from "@/types/Postagem";
import TipoUsuario from "@/types/TipoUsuario";
import Usuario from "@/types/Usuario";
import { useState } from "react";

import { ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";

const Home = () => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    
    const tipo : TipoUsuario = {id: 2, nome: "Estudante"};
    const usuario : Usuario = {id: "1", nome: "João Silva", email: "teste@gmail.com", idTipo: tipo};
    const postagens : Postagem[] = [{id: "1", titulo: "Postagem 1", conteudo: "Conteúdo da postagem 1", ativo: true, dataCriacao: "2023-01-01",usuario: usuario, idUsuario: "1"}, {id: "2", titulo: "Postagem 2", conteudo: "Conteúdo da postagem 2", ativo: true, dataCriacao: "2023-01-02",usuario: usuario, idUsuario: "1"}, {id: "3", titulo: "Postagem 3", conteudo: "Conteúdo da postagem 3", ativo: false, dataCriacao: "2023-01-03",usuario: usuario, idUsuario: "1"}];

    const [query, setQuery] = useState('');


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
            onChangeText={setQuery}
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