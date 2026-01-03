import { Colors } from "@/constants/theme";
import { RootStackParamList } from "@/types/Navigator";
import { Postagem } from "@/types/Postagem";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
type PostagemNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetailsPostagem'
>;
const PostagemComponent = ({ postagem }: { postagem: Postagem }) => {
    const navigation = useNavigation<PostagemNavigationProp>();
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    };
    return (
        <TouchableOpacity
            key={postagem.id}
            style={[
                styles.postCard,
                {
                    backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f9fafb',
                    borderColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb',
                }
            ]}
            activeOpacity={0.7}
        >
            <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                    <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
                        <Text style={styles.avatarText}>
                            {postagem.usuario.nome.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={[styles.userName, { color: colors.text }]}>
                            {postagem.usuario.nome}
                        </Text>
                        <Text style={[styles.userType, { color: colors.icon }]}>
                            {postagem.usuario.idTipo.nome}
                        </Text>
                    </View>
                </View>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: postagem.ativo ? '#10b98133' : '#ef444433' }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: postagem.ativo ? '#059669' : '#dc2626' }
                    ]}>
                        {postagem.ativo ? 'Ativo' : 'Inativo'}
                    </Text>
                </View>
            </View>


            <View style={styles.postContent}>
                <Text style={[styles.postTitle, { color: colors.text }]}>
                    {postagem.titulo}
                </Text>
                <Text
                    style={[styles.postText, { color: colors.icon }]}
                    numberOfLines={1}
                >
                    {postagem.conteudo}
                </Text>
            </View>


            <View style={styles.postFooter}>
                <Text style={[styles.postDate, { color: colors.icon }]}>
                    {formatDate(postagem.dataCriacao)}
                </Text>
                <TouchableOpacity style={[styles.actionButton, { borderColor: colors.tint }]} onPress={()=> navigation.navigate("DetailsPostagem", { postagem })} >
                    <Text style={[styles.actionButtonText, { color: colors.tint }]}>
                        Ler mais
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
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
    postCard: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 2,
    },
    userType: {
        fontSize: 12,
        fontWeight: '400',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    postContent: {
        marginBottom: 12,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
        letterSpacing: -0.3,
    },
    postText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: 0.2,
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.05)',
    },
    postDate: {
        fontSize: 12,
        fontWeight: '500',
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderRadius: 8,
    },
    actionButtonText: {
        fontSize: 12,
        fontWeight: '600',
    },
});
export default PostagemComponent;