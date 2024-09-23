import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Chat App</h1>
      <nav>
        <Link href="/login">Login</Link> |<Link href="/signup">Signup</Link>
      </nav>
    </div>
  );
}
