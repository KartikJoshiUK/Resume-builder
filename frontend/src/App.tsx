import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import SignedInRoutes from "./wrappers/SignedInRoutes";
import { Toaster } from "sonner";

type Props = {};

export default function App({}: Props) {
  return (
    <BrowserRouter>
      <Navbar />
      <SignedOut>Please sign In</SignedOut>
      <SignedIn>
        <SignedInRoutes />
      </SignedIn>
      <Toaster />
    </BrowserRouter>
  );
}
