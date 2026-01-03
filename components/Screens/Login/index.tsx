import { Colors } from '@/constants/theme';
import { RootStackParamList } from '@/types/Navigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import * as Yup from 'yup';
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;
const Login = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  });

  return (
    <Formik 
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={()=>navigation.navigate("HomeScreen")}
    >
      {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.tint }]}>Bem-vindo</Text>
            <Text style={[styles.subtitle, { color: colors.icon }]}>Faça login para continuar</Text>
          </View>

       
          <View style={styles.formContainer}>
       
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: touched.email && errors.email ? '#ef4444' : colors.tint,
                    backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f3f4f6',
                    color: colors.text,
                  }
                ]}
                placeholder="seu.email@exemplo.com"
                placeholderTextColor={colors.icon}
                value={values.email}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isSubmitting}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
                <TouchableOpacity>
                  <Text style={[styles.forgotLink, { color: colors.tint }]}>Esqueceu?</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: touched.password && errors.password ? '#ef4444' : colors.tint,
                    backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f3f4f6',
                    color: colors.text,
                  }
                ]}
                placeholder="••••••••"
                placeholderTextColor={colors.icon}
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                editable={!isSubmitting}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
          </View>

        
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.tint }]}
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

      
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: colors.icon }]}>
              Não tem conta estudante?{' '}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.signUpLink, { color: colors.tint }]}>Registre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  formContainer: {
    marginBottom: 32,
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  forgotLink: {
    fontSize: 13,
    fontWeight: '500',
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  submitButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '400',
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Login;