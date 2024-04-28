import NextAuth from 'next-auth';

import { authOptions } from './controller';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
