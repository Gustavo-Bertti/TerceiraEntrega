import { Colors } from "@/constants/theme";
import { RootStackParamList } from '@/types/Navigator';
import { RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
type DetailsPostagemRouteProp = RouteProp<RootStackParamList, 'DetailsPostagem'>;
type Props = {
  route: DetailsPostagemRouteProp;
};
const ViewPostagem = ({ route }: Props) => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const { postagem } = route.params;
    const formatDate = (date?: string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>{postagem.titulo}</Text>
                <View style={styles.meta}>
                    <Text style={[styles.author, { color: colors.icon }]}>{postagem.usuario?.nome}</Text>
                    <Text style={[styles.date, { color: colors.icon }]}>{formatDate(postagem.dataCriacao)}</Text>
                </View>
            </View>

            <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#0b1220' : '#ffffff', borderColor: colorScheme === 'dark' ? '#1f2937' : '#e6edf3' }]}>
                <Text style={[styles.contentText, { color: colors.text }]}>{postagem.conteudo}</Text>
            </View>
        </ScrollView>
    );
}
export default ViewPostagem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    meta: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    author: {
        fontSize: 14,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        fontWeight: '500',
    },
    card: {
        borderRadius: 12,
        padding: 18,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400',
    },
});