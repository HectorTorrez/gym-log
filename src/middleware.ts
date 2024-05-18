import {authMiddleware} from "@clerk/nextjs/server";

export default authMiddleware({
  // publicRoutes: ["/"],
  ignoredRoutes: ["./app/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
