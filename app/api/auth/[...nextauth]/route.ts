import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import { config } from '@/config/env';
import User from '@/app/models/user';
import bcrypt from 'bcryptjs'
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
            name:'Credentials',
            credentials:{
                email:{label:'Email',type:'email'},
                password:{label:'password',type:'password'},
            },
            async authorize(credentials:any){
                const {email,password} = credentials;

                connectDB()

                // find the user by email
                const user = await User.findOne({email})

                if(!user){
                    throw new Error('user not found')
                }

                const isValidPassword = bcrypt.compare(password,user.password)

                if(!isValidPassword){
                    throw new Error('invalid password')
                }

                return {email:user.email}
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
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
        
        async jwt({ token, account, user }) {
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
