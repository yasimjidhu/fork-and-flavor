import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '@/config/env';
import User from '@/app/models/user';
import bcrypt from 'bcryptjs'
import { connectDB } from '@/utils/mongodb';

interface Credentials {
    email: string;
    password: string;
    username: string;
}

connectDB();

const handler = NextAuth({
    providers: [
        // Google provider
        GoogleProvider({
            clientId: config.GOOGLE_CLIENT_ID!,
            clientSecret: config.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'password', type: 'password' },
                username: { label: 'Username', type: 'text' },
            },
            async authorize(credentials: Credentials) {
                const { email, password, username } = credentials;

                connectDB()

                // check if the user is trying to register or login
                const existingUser = await User.findOne({ email })

                // if user exists , validate password (login attempt)
                if (existingUser) {
                    const isValidPassword = await bcrypt.compare(password, existingUser.password)
                    if (!isValidPassword) {
                        throw new Error('invalid password')
                    }
                    return { email: existingUser.email, username: existingUser.name }
                }

                // if the user doesn't exist, create a new user (registration attempt)
                if (username) {
                    const hashedPassword = await bcrypt.hash(password, 10)
                    const newUser = new User({
                        name: username,
                        email,
                        password: hashedPassword,
                        image: '',
                        googleId: '',
                        createdAt: new Date()
                    })


                    try {
                        await newUser.save()
                    } catch (error: unknown) {
                        console.error('error saving user', error)
                        throw new Error('user registration failed')
                    }

                    return { email: newUser.email, username: newUser.name }
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
        signup: '/auth/register',
    },
    secret: config.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {

            if (account?.provider === 'google') {
                const existingUser = await User.findOne({ email: profile?.email });
                if (!existingUser) {
                    const newUser = new User({
                        name: profile?.name || 'Anonymous',
                        email: profile?.email,
                        image: user?.image || '',
                        googleId: profile?.sub,
                        createdAt: new Date(),
                    });
                    try {
                        await newUser.save();
                    } catch (error) {
                        console.error('Error saving user:', error);
                        throw new Error('User validation failed');
                    }
                }
            }
            return true;
        },

        async jwt({ token, account }) {
            if (account && account.provider === 'google') {
                let existingUser = await User.findOne({ googleId: account.providerAccountId });

                if (!existingUser) {
                    // Create user if it doesn't exist
                    existingUser = new User({
                        name: account.name,
                        email: account.email,
                        image: account.image,
                        googleId: account.providerAccountId,
                        createdAt: new Date(),
                    });
                    await existingUser.save();
                }

                token.id = existingUser._id;
                token.email = existingUser.email;
                token.name = existingUser.name;
                token.image = existingUser.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // Add token data to session
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.image as string || '/user.png'
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
