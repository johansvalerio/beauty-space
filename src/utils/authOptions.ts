import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
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

                console.log(userFound);
                // Check if user exists and password matches
                if (!userFound) throw new Error('No user found or invalid password');



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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            // Si es Google, crea el usuario si no existe
            if (account?.provider === "google") {
                const userFound = await db.user.findUnique({
                    where: { user_email: user.email! },
                });
                if (!userFound) {
                    await db.user.create({
                        data: {
                            user_name: user.name!,
                            user_email: user.email!,
                            user_image: user.image,
                            //no agregar password ni teléfono para google
                        },

                    });
                }
                // Si el usuario ya existe, no hacer nada
            }
            return true;
        },
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
