import {SignIn} from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="flex h-[calc(100vh-40px)] content-center items-center justify-center align-middle">
      <SignIn />
    </section>
  );
}
