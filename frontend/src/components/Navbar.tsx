import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <header className="p-4 px-6 flex justify-between items-center bg-red-100">
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/icon.png"
          alt="logo image"
          className="w-10 h-10 object-contain"
        />
        <h1 className="font-bold text-2xl font-mono">Resume Builder</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-2">
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <SignedOut>
            <li>
              <SignInButton>Sign In</SignInButton>
            </li>
            <li>
              <SignUpButton>Sign Up</SignUpButton>
            </li>
          </SignedOut>
          <SignedIn>
            <li>
              <UserButton />
            </li>
          </SignedIn>
        </ul>
      </nav>
    </header>
  );
}
