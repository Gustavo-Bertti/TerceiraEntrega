import { deletarUsuario, listarUsuarios } from "@/components/ControllerUsuario";
import { Colors } from "@/constants/theme";
import Usuario from "@/types/Usuario";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

const GerenciadorUsuario = () => {
  const navigation = useNavigation<any>();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filter, setFilter] = useState<"all" | "estudante" | "professor">("all");

  useEffect(() => {
    carregarUsuarios();
  }, []);

    async function carregarUsuarios() {
    try {
        const professores = await listarUsuarios(1);
        const estudantes = await listarUsuarios(2);

        setUsuarios([
        ...(professores?.data ?? []),
        ...(estudantes?.data ?? []),
        ]);
    } catch {
        Alert.alert("Erro", "Não foi possível carregar os usuários");
    }
    }

  function handleEditar(usuario: Usuario) {
    navigation.navigate("FormularioUsuario", { usuario });
  }

  function handleNovo() {
    navigation.navigate("FormularioUsuario");
  }

  function handleExcluir(usuario: Usuario) {
    Alert.alert("Excluir usuário", `Deseja excluir ${usuario.nome}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        async onPress() {
          try {
            await deletarUsuario(usuario.id!);
            setUsuarios(prev => prev.filter(u => u.id !== usuario.id));
          } catch {
            Alert.alert("Erro", "Não foi possível excluir o usuário");
          }
        },
      },
    ]);
  }

  const usuariosFiltrados = usuarios.filter(u => {
    if (filter === "all") return true;
    if (filter === "estudante") return u.idTipo?.nome === "Estudante";
    if (filter === "professor") return u.idTipo?.nome === "Professor";
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Gerenciador de Usuários
        </Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Filtre, edite ou remova usuários
        </Text>
      </View>

      <View style={styles.filterWrapper}>
        {["all", "estudante", "professor"].map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(item as any)}
            style={[
              styles.pill,
              filter === item && { backgroundColor: colors.tint },
            ]}
          >
            <Text
              style={[
                styles.pillText,
                filter === item && { color: "#fff" },
              ]}
            >
              {item === "all"
                ? "Todos"
                : item === "estudante"
                ? "Estudantes"
                : "Professores"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {usuariosFiltrados.map(user => (
          <View key={user.id} style={styles.card}>
            <View style={styles.row}>
              <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
                <Text style={styles.avatarText}>
                  {user.nome.charAt(0).toUpperCase()}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={[styles.name, { color: colors.text }]}>
                  {user.nome}
                </Text>
                <Text style={[styles.role, { color: colors.icon }]}>
                  {user.idTipo.nome}
                </Text>
                <Text style={[styles.email, { color: colors.icon }]}>
                  {user.email}
                </Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.editBtn, { borderColor: colors.tint }]}
                onPress={() => handleEditar(user)}
              >
                <Text style={[styles.editText, { color: colors.tint }]}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleExcluir(user)}
              >
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.tint }]}
        onPress={handleNovo}
      >
        <Text style={styles.addButtonText}>+ Novo Usuário</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GerenciadorUsuario;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 28 },
  header: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 13 },
  list: { paddingBottom: 24, gap: 12 },
  card: { borderRadius: 12, padding: 14, borderWidth: 1 },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 48, height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 12 },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "700" },
  role: { fontSize: 12, fontWeight: "600" },
  email: { fontSize: 13, marginTop: 6 },
  actions: { flexDirection: "row", marginTop: 12, gap: 8 },
  editBtn: { padding: 8, borderRadius: 10, borderWidth: 1 },
  editText: { fontWeight: "600" },
  deleteBtn: { padding: 8, borderRadius: 10, backgroundColor: "#fee2e2" },
  deleteText: { color: "#b91c1c", fontWeight: "700" },
  addButton: { position: "absolute", right: 16, bottom: 20, height: 52, borderRadius: 14, justifyContent: "center", alignItems: "center", paddingHorizontal: 18 },
  addButtonText: { color: "#fff", fontWeight: "700" },
  filterWrapper: { flexDirection: "row", gap: 8, marginBottom: 12 },
  pill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1 },
  pillText: { fontWeight: "600" },
});
