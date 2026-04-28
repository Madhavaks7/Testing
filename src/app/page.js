"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Loader2, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, role, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (isLogin && email === "admin123@gmail.com" && password === "admin123") {
      // Hardcode admin bypass
      localStorage.setItem("techfusion_hardcoded_admin", "true");
      // Give context a moment to catch the localstorage change before redirecting
      setTimeout(() => {
        window.location.href = "/admin"; // Force reload to re-run context initialization
      }, 500);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;
        
        // Save user role in Firestore
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid,
          email: newUser.email,
          role: "user", // default role
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-zinc-900 transition-colors">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (user) return null; // Prevent flash of login before redirect

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-slate-900 transition-colors">
      <div className="max-w-md w-full space-y-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 dark:border-white/10 transition-colors">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {isLogin ? "Sign in to your Techfusion account" : "Join us for premium stationery"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/30 py-2 rounded-lg border border-red-100 dark:border-red-900/50">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isLogin ? "Sign In" : "Sign Up"
              )}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-indigo-500 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
