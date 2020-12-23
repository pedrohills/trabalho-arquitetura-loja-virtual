export interface User {
    id: number;
    email: string;
    created: Date;
}

export const ANOYMOUS_USER: User = {
    id: 0,
    email: "",
    created: new Date()
}