import {authMiddleware} from "@clerk/nextjs";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/exercises"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)"],
};
