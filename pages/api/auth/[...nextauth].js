import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log(process.env.GITHUB_CLIENT_ID);
// console.log(process.env.NEXTAUTH_URL);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
  ],
  debug: true,
  secret: process.env.SECRET,
});
