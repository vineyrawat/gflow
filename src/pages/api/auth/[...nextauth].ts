import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { use } from "react";

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    // GoogleProvider({
    // clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    // clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      authorization: { params: { scope: "project workflow repo" } },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user.profile = token.profile;
        session.user.account = token.account;
      }

      return Promise.resolve(session);
    },
    async jwt({ account, token, profile }) {
      if (account) {
        token.account = account;
      }

      if (profile) {
        token.profile = profile;
      }

      return Promise.resolve(token);
    },
  },
});
