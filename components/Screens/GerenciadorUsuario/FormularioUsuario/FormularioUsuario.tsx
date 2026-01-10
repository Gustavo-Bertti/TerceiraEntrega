import { atualizarUsuario, criarUsuario } from "@/components/ControllerUsuario";
import { Colors } from "@/constants/theme";
import Usuario from "@/types/Usuario";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

const FormularioUsuario = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const usuario: Usuario | undefined = route.params?.usuario;

  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [senha, setSenha] = useState("");
  const [idTipo, setIdTipo] = useState<number>(usuario?.idTipo?.id ?? 1);
  const [loading, setLoading] = useState(false);

  const isEdit = !!usuario;

  async function salvar() {
    if (!nome || !email || (!isEdit && !senha)) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await atualizarUsuario(usuario!.id!, {
          nome,
          email,
          idTipo,
        });
      } else {
        await criarUsuario({
          nome,
          email,
          senha,
          idTipo,
        });
      }

      Alert.alert(
        "Sucesso",
        isEdit ? "Usuário atualizado" : "Usuário criado",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {isEdit ? "Editar Usuário" : "Novo Usuário"}
      </Text>

      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.icon }]}
        placeholder="Nome"
        placeholderTextColor={colors.icon}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.icon }]}
        placeholder="Email"
        placeholderTextColor={colors.icon}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {!isEdit && (
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.icon }]}
          placeholder="Senha"
          placeholderTextColor={colors.icon}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      )}

      <View style={styles.tipoWrapper}>
        <TouchableOpacity
          onPress={() => setIdTipo(1)}
          style={[
            styles.tipoBtn,
            idTipo === 1 && { backgroundColor: colors.tint },
          ]}
        >
          <Text style={{ color: idTipo === 1 ? "#fff" : colors.text }}>
            Professor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIdTipo(2)}
          style={[
            styles.tipoBtn,
            idTipo === 2 && { backgroundColor: colors.tint },
          ]}
        >
          <Text style={{ color: idTipo === 2 ? "#fff" : colors.text }}>
            Estudante
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: colors.tint }]}
        onPress={salvar}
        disabled={loading}
      >
        <Text style={styles.saveText}>
          {isEdit ? "Salvar alterações" : "Cadastrar usuário"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormularioUsuario;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12 },
  tipoWrapper: { flexDirection: "row", gap: 12, marginVertical: 16 },
  tipoBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  saveBtn: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
