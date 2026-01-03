import { Colors } from "@/constants/theme";
import TipoUsuario from "@/types/TipoUsuario";
import Usuario from "@/types/Usuario";
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

const GerenciadorUsuario = () => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const estudante: TipoUsuario = { id: 2, nome: "Estudante" };
    const professor: TipoUsuario = { id: 1, nome: "Professor" };

    const usuarios: Usuario[] = [
        { id: "1", nome: "João Silva", email: "teste@gmail.com", idTipo: estudante },
        { id: "2", nome: "Maria Oliveira", email: "maria@gmail.com", idTipo: professor },
        { id: "3", nome: "Carlos Souza", email: "carlos@gmail.com", idTipo: estudante }
    ];

    const [filter, setFilter] = useState<'all'|'estudante'|'professor'>('all');

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Gerenciador de Usuários</Text>
                <Text style={[styles.subtitle, { color: colors.icon }]}>Filtre, edite ou remova usuários</Text>
            </View>

            <View style={styles.filterWrapper}>
                <TouchableOpacity onPress={() => setFilter('all')} style={[styles.pill, filter === 'all' && { backgroundColor: colors.tint }]}> 
                    <Text style={[styles.pillText, filter === 'all' && { color: '#fff' }]}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('estudante')} style={[styles.pill, filter === 'estudante' && { backgroundColor: colors.tint }]}> 
                    <Text style={[styles.pillText, filter === 'estudante' && { color: '#fff' }]}>Estudantes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('professor')} style={[styles.pill, filter === 'professor' && { backgroundColor: colors.tint }]}> 
                    <Text style={[styles.pillText, filter === 'professor' && { color: '#fff' }]}>Professores</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                {usuarios
                    .filter(u => filter === 'all' || (filter === 'estudante' && u.idTipo.nome === 'Estudante') || (filter === 'professor' && u.idTipo.nome === 'Professor'))
                    .map((user) => (
                    <View key={user.id} style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#071022' : '#fff', borderColor: colorScheme === 'dark' ? '#1f2937' : '#e6edf3' }]}>
                        <View style={styles.row}>
                            <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
                                <Text style={styles.avatarText}>{user.nome.charAt(0).toUpperCase()}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{user.nome}</Text>
                                <Text style={[styles.role, { color: colors.icon }]}>{user.idTipo.nome}</Text>
                                <Text style={[styles.email, { color: colors.icon }]} numberOfLines={1}>{user.email}</Text>
                            </View>
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity style={[styles.editBtn, { borderColor: colors.tint }]}>
                                <Text style={[styles.editText, { color: colors.tint }]}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteBtn}>
                                <Text style={styles.deleteText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.tint }]}>
                <Text style={styles.addButtonText}>+ Novo Professor</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GerenciadorUsuario;

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 28 },
    header: { marginBottom: 12 },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
    subtitle: { fontSize: 13, fontWeight: '400' },
    list: { paddingBottom: 24, gap: 12 },
    card: { borderRadius: 12, padding: 14, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
    row: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    avatarText: { color: '#fff', fontWeight: '700', fontSize: 18 },
    info: { flex: 1 },
    name: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
    role: { fontSize: 12, fontWeight: '600' },
    email: { fontSize: 13, marginTop: 6 },
    actions: { flexDirection: 'row', marginTop: 12, gap: 8 },
    editBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },
    editText: { fontSize: 13, fontWeight: '600' },
    deleteBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#fee2e2' },
    deleteText: { color: '#b91c1c', fontWeight: '700' },
    addButton: { position: 'absolute', right: 16, bottom: 20, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 6 },
    addButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
    filterWrapper: { flexDirection: 'row', gap: 8, paddingHorizontal: 4, marginBottom: 12 },
    pill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' },
    pillText: { fontSize: 13, fontWeight: '600' }
});

