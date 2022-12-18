import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <h1>Login Page</h1>
      
      <div>
        <Link href="/">
          Home
        </Link>
        <Link href="/login">
            Login
        </Link>
        <Link href="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}