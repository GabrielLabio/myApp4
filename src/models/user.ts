import { BlocoFeito } from "./blocoFeito";

export interface User {
    email: string;
    uid: string;
    password: string;

    blocosFeitos: {
        blocoFeito: BlocoFeito
    }
}
