import { Colors } from "@/constants/theme";
import { RootStackParamList } from "@/types/Navigator";
import { Postagem } from "@/types/Postagem";
import TipoUsuario from "@/types/TipoUsuario";
import Usuario from "@/types/Usuario";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
type PostagemNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ControllerPostagem'
>;
const GerenciadorPostagem = () => {
    const navigation = useNavigation<PostagemNavigationProp>();
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const tipo: TipoUsuario = { id: 2, nome: "Estudante" };
    const usuario: Usuario = { id: "1", nome: "João Silva", email: "teste@gmail.com", idTipo: tipo };
    const postagens: Postagem[] = [
        { id: "1", titulo: "Postagem 1", conteudo: "Conteúdo da postagem 1", ativo: true, dataCriacao: "2023-01-01", usuario: usuario, idUsuario: "1" },
        { id: "2", titulo: "Postagem 2", conteudo: "Conteúdo da postagem 2", ativo: true, dataCriacao: "2023-01-02", usuario: usuario, idUsuario: "1" },
        { id: "3", titulo: "Postagem 3", conteudo: "Conteúdo da postagem 3", ativo: false, dataCriacao: "2023-01-03", usuario: usuario, idUsuario: "1" }
    ];

    const formatDate = (date?: string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Gerenciador de Postagens</Text>
                <Text style={[styles.subtitle, { color: colors.icon }]}>Edite, exclua ou adicione novas postagens</Text>
            </View>

            <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                {postagens.map((postagem) => (
                    <View key={postagem.id} style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#0b1220' : '#fff', borderColor: colorScheme === 'dark' ? '#1f2937' : '#e6edf3' }]}>
                        <View style={styles.cardHeader}>
                            <Text style={[styles.postTitle, { color: colors.text }]} numberOfLines={1}>{postagem.titulo}</Text>
                            <Text style={[styles.postStatus, { color: postagem.ativo ? '#059669' : '#dc2626' }]}>{postagem.ativo ? 'Ativo' : 'Inativo'}</Text>
                        </View>

                        <Text style={[styles.meta, { color: colors.icon }]}>{postagem.usuario.nome} · {formatDate(postagem.dataCriacao)}</Text>

                        <View style={styles.actions}>
                            <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.tint }]} onPress={() => navigation.navigate('ControllerPostagem', { postagem })}>
                                <Text style={[styles.actionText, { color: colors.tint }]}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.deleteBtn]}>
                                <Text style={styles.deleteText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.tint }]} onPress={() => navigation.navigate('ControllerPostagem', {})}>
                <Text style={styles.addButtonText}>+ Nova Postagem</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GerenciadorPostagem;

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 28 },
    header: { marginBottom: 12 },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
    subtitle: { fontSize: 13, fontWeight: '400' },
    list: { paddingBottom: 24, gap: 12 },
    card: { borderRadius: 12, padding: 14, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    postTitle: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 8 },
    postStatus: { fontSize: 12, fontWeight: '700' },
    meta: { fontSize: 12, marginBottom: 8 },
    actions: { flexDirection: 'row', gap: 8 },
    actionBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },
    actionText: { fontSize: 13, fontWeight: '600' },
    deleteBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#fee2e2' },
    deleteText: { color: '#b91c1c', fontWeight: '700' },
    addButton: { position: 'absolute', right: 16, bottom: 20, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 6 },
    addButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 }
});