import {authMiddleware} from "@clerk/nextjs";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default authMiddleware({
  // publicRoutes: ["/"],
  ignoredRoutes: ["/app/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
