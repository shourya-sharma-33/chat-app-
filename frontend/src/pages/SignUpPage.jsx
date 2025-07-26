import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import WhaleModel from "../components/whaleModel";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  // Overlay ref + animation state
  const overlayRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name Is Required");
    if (!formData.email.trim()) return toast.error("Email Is Required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  // GSAP animation + navigation for LogIn link
  const handleLoginClick = (e) => {
    e.preventDefault();
    if (isAnimating) return; // Prevent double clicks
    setIsAnimating(true);

    const overlay = overlayRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        navigate("/login");
      },
    });

    tl.set(overlay, { y: "100%", display: "block", filter: "blur(0px)" })
      .to(overlay, { y: "0%", duration: 0.5, ease: "power3.out" })
      .to(overlay, { filter: "blur(8px)", duration: 0.4, ease: "power3.out" }, "+=0.1");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Fullscreen overlay div */}
      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="fixed top-0 left-0 w-full h-full bg-blue-500 z-50 pointer-events-none"
      />

      <div className="flex flex-col min-h-screen justify-center items-center p-6 sm:p-12">
        <div className="w-[80%] space-y-8 backdrop-blur p-5 rounded-lg shadow-md grid lg:grid-cols-2 items-center bg-blue-500/20">
          <div className="self-center border-left-line px-5">
            <div className="text-center mb-8">
              <div className="flex flex-row items-center gap-2 group">
                <div className="w-full rounded-xl bg-primary/10 flex flex-col items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <img src="/src/assets/logo.svg" alt="Logo" className="w-64 text-primary" />
                  <p className="text-base-content/60 cherry-bomb-one-regular text-xl">
                    Get Started with your free account
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium fredoka-font">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-base-content" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 bg-transparent"
                    placeholder="Ayumu Kasuga"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
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
                    placeholder="ayumukasuga@osaka.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
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
                    placeholder="Shhh! Its Secret"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
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
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          <div>
            <div className="flex flex-col h-[100%] justify-center self-center items-center p-6 sm:p-12">
              <WhaleModel />
              <p className="text-base-content/60 cherry-bomb-one-regular text-xl">
                are you already part of the whale gang??{" "}
                {/* Use an <a> to intercept click and animate */}
                <a
                  href="/login"
                  onClick={handleLoginClick}
                  className="cherry-bomb-one-regular justify-self-center text-red-700 h-6 w-6 flex items-center cursor-pointer"
                >
                  LogIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
