import { Postagem } from "./Postagem";

export type RootStackParamList = {
    Login: undefined;
    HomeScreen: undefined;
    DetailsPostagem: { postagem: Postagem };
    ControllerPostagem: { postagem?: Postagem };
}