import api from '@/config/api/api';
import useUserPermissions from '@/config/auth/userPermissions';
import { Colors } from '@/constants/theme';
import { RootStackParamList } from '@/types/Navigator';
import Token from '@/types/Token';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from "formik";
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import * as Yup from 'yup';

const postagemSchema = Yup.object().shape({
    titulo: Yup.string().min(3, 'Título deve ter no mínimo 3 caracteres').required('Título é obrigatório'),
    conteudo: Yup.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres').required('Conteúdo é obrigatório'),
});
type PostagemNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ControllerPostagem'
>;
type PostagemRouteProp = RouteProp<RootStackParamList, 'ControllerPostagem'>;
type Props = {
    route: PostagemRouteProp;
};
const ControllerPostagem = ({ route }: Props) => {
    const { postagem } = route.params || {};
    const navigation = useNavigation<PostagemNavigationProp>();
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const isEditing = Boolean(postagem);
    const { checkPermissions } = useUserPermissions();
    const [token, setToken] = useState<Token>();
    useEffect(() => {
        const fetchToken = async () => {
            const t = await checkPermissions();
            setToken(t);
        };

        fetchToken();
    }, []);

    const createPostagem = async (values: { titulo: string, conteudo: string }) => {
        await api.post('postagem', {titulo: values.titulo, conteudo: values.conteudo, idUsuario: token?.idUsuario}).then(response => {
            Alert.alert('Postagem criada com sucesso');
            navigation.goBack();
        })
            .catch(error => {
                Alert.alert('Erro ao criar postagens:', error);
            });;

    }
    const putPostagem = async (values: { titulo: string, conteudo: string, ativo: boolean }) => {
        await api.put('postagem/' + postagem?.id, values).then(response => {
            Alert.alert('Postagem atualizada com sucesso');
            navigation.goBack();
        })
            .catch(error => {
                Alert.alert('Erro ao atualizar postagem:', error);
            });;
    }
    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>{isEditing ? 'Editar Postagem' : 'Adicionar Postagem'}</Text>
                <Text style={[styles.subtitle, { color: colors.icon }]}>{isEditing ? 'Atualize os detalhes da postagem' : 'Crie uma nova postagem'}</Text>
            </View>

            <Formik
                initialValues={{ titulo: postagem?.titulo ?? '', conteudo: postagem?.conteudo ?? '', ativo: postagem?.ativo ?? true }}
                validationSchema={postagemSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        if (isEditing) {
                            await putPostagem(values);
                        } else {
                            await createPostagem(values);
                        }
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                    <View style={styles.form}>
                        <Text style={[styles.label, { color: colors.text }]}>Título</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#0b1220' : '#f3f4f6', color: colors.text, borderColor: colors.tint }]}
                            placeholder="Título da postagem"
                            placeholderTextColor={colors.icon}
                            value={values.titulo}
                            onChangeText={handleChange('titulo')}
                            editable={!isSubmitting}
                        />
                        {touched.titulo && errors.titulo && <Text style={styles.errorText}>{errors.titulo}</Text>}

                        <Text style={[styles.label, { color: colors.text }]}>Conteúdo</Text>
                        <TextInput
                            style={[styles.textarea, { backgroundColor: colorScheme === 'dark' ? '#0b1220' : '#f9fafb', color: colors.text, borderColor: colors.tint }]}
                            placeholder="Escreva o conteúdo aqui..."
                            placeholderTextColor={colors.icon}
                            value={values.conteudo}
                            onChangeText={handleChange('conteudo')}
                            multiline
                            numberOfLines={6}
                            editable={!isSubmitting}
                        />
                        {touched.conteudo && errors.conteudo && <Text style={styles.errorText}>{errors.conteudo}</Text>}
                        {isEditing && (<>
                        <View style={styles.switchRow}>
                            <Text style={[styles.label, { color: colors.text }]}>Ativo</Text>
                            <Switch
                                value={!!values.ativo}
                                onValueChange={(val: boolean) => {
                                    setFieldValue('ativo', val);
                                }}
                                trackColor={{ true: colors.tint, false: (colorScheme === 'dark' ? '#374151' : '#e5e7eb') }}
                                thumbColor={undefined}
                                ios_backgroundColor={colorScheme === 'dark' ? '#374151' : '#e5e7eb'}
                                disabled={isSubmitting}
                            />
                        </View>
                        {touched.ativo && errors.ativo && <Text style={styles.errorText}>{errors.ativo}</Text>}
                        </>)}

                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={[styles.primaryButton, { backgroundColor: colors.tint }]}
                                onPress={() => handleSubmit()}
                                disabled={isSubmitting}
                            >
                                <Text style={styles.primaryButtonText}>{isEditing ? 'Salvar alterações' : 'Publicar'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.goBack()} disabled={isSubmitting}>
                                <Text style={styles.ghostButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

export default ControllerPostagem;

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },
    header: { marginBottom: 16 },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
    subtitle: { fontSize: 13, fontWeight: '400' },
    form: { marginTop: 6 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    input: { height: 50, borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, fontSize: 16, marginBottom: 10 },
    textarea: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, paddingTop: 12, fontSize: 16, textAlignVertical: 'top' },
    errorText: { color: '#ef4444', marginTop: 6, marginBottom: 6, fontSize: 13, fontWeight: '600' },
    actions: { flexDirection: 'row', gap: 12, marginTop: 18 },
    primaryButton: { flex: 1, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 4 },
    primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
    ghostButton: { height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)' },
    ghostButtonText: { fontWeight: '700', color: '#374151' },
    switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginBottom: 6 },
});