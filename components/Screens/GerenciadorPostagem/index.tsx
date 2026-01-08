import api from "@/config/api/api";
import useUserPermissions from "@/config/auth/userPermissions";
import { Colors } from "@/constants/theme";
import { RootStackParamList } from "@/types/Navigator";
import { Postagem } from "@/types/Postagem";
import Token from "@/types/Token";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
type PostagemNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ControllerPostagem'
>;
const GerenciadorPostagem = () => {
    const navigation = useNavigation<PostagemNavigationProp>();
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const { checkPermissions } = useUserPermissions();
    const getToken = async () => await checkPermissions();
    const [token, setToken] = useState<Token | null>(null);
    getToken().then(t => setToken(t ? t : null));

    const getPostagens = async () => {
        try{
        const response = await api.get<Postagem[]>('/postagem/usuario/' + token?.idUsuario)
        if (response.data)setPostagens(response.data);
        }catch(error){
            setPostagens([]);
        }

    }
    const deletePostagem = async (idPostagem: string) => {
        try{
            await api.delete('postagem/' + idPostagem)
            await getPostagens();
            return true;
        }catch(error){
            return false;
        }
    }

    const confirmDelete = (idPostagem: string, titulo?: string) => {
        Alert.alert(
            'Confirmar exclusão',
            `Você tem certeza que deseja excluir "${titulo ?? ''}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', style: 'destructive', onPress: async () => {
                    const ok = await deletePostagem(idPostagem);
                    if (ok) {
                        Alert.alert('Excluído', 'Postagem excluída com sucesso');
                    } else {
                        Alert.alert('Erro', 'Falha ao excluir a postagem');
                    }
                } },
            ],
            { cancelable: true }
        );
    }

    useFocusEffect(
        useCallback(() => {
            getPostagens();
        }, [])
    );

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
                            <TouchableOpacity onPress={() => confirmDelete(postagem.id, postagem.titulo)} style={[styles.deleteBtn, { borderColor: '#fca5a5', backgroundColor: colorScheme === 'dark' ? '#2b0b0b' : '#fff6f6' }]}>
                                <Text style={[styles.deleteText, { color: '#b91c1c' }]}>Excluir</Text>
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