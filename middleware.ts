import {authMiddleware} from "@clerk/nextjs/server";

export default authMiddleware({
  // publicRoutes: ["/"],
  ignoredRoutes: ["/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
