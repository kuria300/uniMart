import { handlers } from "@/auth";

console.log('🧭 NEXTAUTH_URL in production:', process.env.NEXTAUTH_URL);
export const {GET, POST}= handlers