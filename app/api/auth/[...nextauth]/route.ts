import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Get admin credentials from environment variables
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.username === adminUsername &&
          credentials?.password === adminPassword
        ) {
          // Return a user object (what gets stored in the session)
          return { id: "1", name: adminUsername };
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login", // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    }
  }
});

export { handler as GET, handler as POST };