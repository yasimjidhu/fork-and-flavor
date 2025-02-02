import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '@/config/env';
import User from '@/app/models/user';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/utils/mongodb';


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
                password: { label: 'Password', type: 'password' },
                username: { label: 'Username', type: 'text' },
            },
            // Adjust the type of credentials to match the expected type from NextAuth
            async authorize(credentials: Record<string, string> | undefined) {
                if (!credentials) {
                    throw new Error('Missing credentials');
                }

                const { email, password, username } = credentials;

                connectDB();

                // Check if the user is trying to register or login
                const existingUser = await User.findOne({ email });

                // If the user exists, validate password (login attempt)
                if (existingUser) {
                    const isValidPassword = await bcrypt.compare(password, existingUser.password);
                    if (!isValidPassword) {
                        throw new Error('Invalid password');
                    }
                    // Return the expected User structure
                    return { id: existingUser._id, email: existingUser.email, name: existingUser.name, image: existingUser.image };
                }

                // If the user doesn't exist, create a new user (registration attempt)
                if (username) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const newUser = new User({
                        name: username,
                        email,
                        password: hashedPassword,
                        image: '',
                        googleId: '',
                        createdAt: new Date(),
                    });

                    try {
                        await newUser.save();
                    } catch (error) {
                        console.error('Error saving user', error);
                        throw new Error('User registration failed');
                    }

                    // Return the expected User structure
                    return { id: newUser._id, email: newUser.email, name: newUser.name, image: newUser.image };
                }

                return null; // If neither login nor registration is successful, return null
            }
        })
    ],
    pages: {
        signIn: '/auth/login', // Specify only the signIn page
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

                session.user = session.user || {}
                
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.image as string || '/user.png';
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
