import {SignUp} from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <section className="flex h-[calc(100vh-40px)] content-center items-center justify-center align-middle">
      <SignUp />
    </section>
  );
}
