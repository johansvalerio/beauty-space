import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/lib/db';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password', placeholder: '*****' },
            },
            async authorize(credentials): Promise<Session["user"]> {
                console.log(credentials);

                const userFound = await db.user.findUnique({
                    where: {
                        user_email: credentials?.email,
                    },
                    include: {
                        role: true,
                    },
                });

                if (!userFound) throw new Error('No user found or invalid password');

                console.log(userFound);

                //const matchPassword = await bcrypt.compare(credentials?.password, userFound.user_password)
                const matchPassword = credentials?.password === userFound.user_password;

                if (!matchPassword) throw new Error('Wrong password')

                return {
                    id: userFound.user_id.toString(),
                    name: userFound.user_name,
                    email: userFound.user_email,
                    role: userFound.role?.role_id,
                };
            },
        }),
    ],
    callbacks: {
        session: async ({ session, token }: { session: Session, token: JWT }) => {
            if (session?.user) {
                session.user.id = token.sub as string; // token.uid or token.sub both work
                session.user.role = token.role;
            }
            return session;
        },
        jwt: async ({ token, user }: { token: JWT, user?: Session["user"] }) => {
            if (user) {
                token.sub = user.id; // token.uid or token.sub both work
                token.role = user.role;
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth/signin'
    },
};
