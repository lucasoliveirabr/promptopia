import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        const sessionUser = await User.findOne({
          email: session.user.email
        });

        session.user.id = sessionUser._id.toString();
      } else {
        console.error("User in \"session.user\" not found.");
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        if (profile && profile.email && profile.name && profile.picture) {
          const userExists = await User.findOne({
            email: profile.email
          })

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture
            })
          }
        }

        return true;
      } catch (error) {
        console.error("Error checking if user exists: ", error);
        return false;
      }
    }
  },
})

export { handler as GET, handler as POST };