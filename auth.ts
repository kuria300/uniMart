import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from './lib/mongodb';
import { User } from './model/User';
import bcrypt from "bcrypt"
import { InvalidEmailError, RequiredFieldsError, ShortPasswordError, WrongPasswordError, ProviderConflictError  } from './lib/errors';
import { CredentialsSignin } from "next-auth";


export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge:60 * 60
  },
   secret: process.env.NEXTAUTH_SECRET!,
  providers: [
     CredentialsProvider({
      id:"Credentials",
      name: "Credentials",
      type:"credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder:"example@gmail.com" },
        password: { label: "Password", type: "password", placeholder:"Enter password"},
      },
      async authorize(credentials) {
       await dbConnect();

       const pass= credentials.password as string
       const email= credentials.email as string

       function isValid(email:string){
         const RegEx= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
         return RegEx.test(email)
       }
       if(!email || !pass){
        throw new RequiredFieldsError();
       }
       if(!isValid(email)){
         throw new InvalidEmailError()
       }

       if(pass.length < 6){
        throw new ShortPasswordError();
       }

       let user= await User.findOne({ email });

       if(!user){
        const hashPassword= await bcrypt.hash(pass, 10);

       user = new User({
        email,
        password: hashPassword,
        name: email,
        provider: "credentials",
       });

        await user.save();
       }else{
          if (!user.password) {
          throw new ProviderConflictError();
         }
        const passValid = await bcrypt.compare(pass, user.password);
        if (!passValid) throw new WrongPasswordError();
         }

        return {
         id: user._id.toString(),
         name: user.name,
        email: user.email,
        };
      },
    }),
      GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      await dbConnect()
      
      if(account?.provider === 'google'){
      const existingUser= await User.findOne({email: token.email})

      if(!existingUser){
         const newUser = await User.create({
          name: user.name,
          email: user.email,
          provider: 'google',
        });
        await newUser.save()
         token.id = newUser._id.toString()
      } else {
        token.id = existingUser._id.toString();
      }
    }
      // if (user) {
      //   token.id = user.id;
      // }
      return token;
     
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
   pages: {
    signIn: "/auth/signin",   
    error: "/auth/signin",    // show errors on same page
  },
});


//export const option: NextAuthOptions = { ... } rule book(follow style) v4 style api