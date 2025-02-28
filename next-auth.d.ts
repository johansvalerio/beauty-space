
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role?: number | unknown;
            email: string;
            name: string;
            image?: string | null | unknown;
        } & DefaultSession['user'];
    }
}

// declare module 'next-auth/jwt' {
//     interface JWT {
//         sub?: string; // sub is type string | undefined
//         role?: number; // role is type number | undefined
//     }
// }