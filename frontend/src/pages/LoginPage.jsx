import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import WhaleModel from "../components/whaleModel";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  // Overlay ref
  const overlayRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  // Handle the "SignIn" click animation + navigation
  const handleSignInClick = (e) => {
    e.preventDefault();
    if (isAnimating) return; // prevent double clicks
    setIsAnimating(true);

    const overlay = overlayRef.current;

    // GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // After animation, navigate to /signup
        navigate("/signup");
      },
    });

    tl.set(overlay, { y: "100%", display: "block", filter: "blur(0px)" })
      .to(overlay, { y: "0%", duration: 0.5, ease: "power3.out" })
      .to(
        overlay,
        { filter: "blur(8px)", duration: 0.4, ease: "power3.out" },
        "+=0.1"
      );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Fullscreen overlay div that animates */}
      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="fixed top-0 left-0 w-full h-full bg-blue-500 z-50 pointer-events-none"
      />
      <div className="flex flex-col min-h-screen justify-center items-center p-6 sm:p-12">
        <div className="w-[80%] space-y-8 backdrop-blur p-5 rounded-lg shadow-md grid lg:grid-cols-2 items-center bg-blue-500/20">
          <div className="flex flex-col h-[100%] justify-center self-center items-center p-6 sm:p-12 border-left-line">
            <WhaleModel />
            <p className="text-base-content/60 cherry-bomb-one-regular text-xl">
              YOU WERE NEVER PART OF THE WHALE GANG {">:("}{" "}
              <a
                href="/signup"
                onClick={handleSignInClick}
                className="cherry-bomb-one-regular justify-self-center text-red-700 h-6 w-6 flex items-center cursor-pointer"
              >
                SignIn
              </a>
            </p>
          </div>
          <div className="self-center  px-5">
            <div className="text-center mb-8">
              <div className="flex flex-row items-center gap-2 group">
                <div className="w-full rounded-xl bg-primary/10 flex flex-col items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <img
                    src="/src/assets/logo.svg"
                    alt="Logo"
                    className="w-64 text-primary"
                  />
                  <p className="text-base-content/60 cherry-bomb-one-regular text-xl">
                    Login to your account
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ... email and password inputs unchanged ... */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 bg-transparent"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 bg-transparent"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 text-base-content/40" />
                    ) : (
                      <Eye className="w-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full bg-emerald-700/60"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 animate-spin inline-block mr-2" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
