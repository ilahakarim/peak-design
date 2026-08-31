import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import logo from "../assets/home-logo.png";

export default function LoginForm() {
   const navigate = useNavigate();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState({});
   const [isVisible, setIsVisible] = useState(false);

   const toggleVisibility = () => {
      setIsVisible((prevState) => !prevState);
   };

   // Email düzgün formatdadırmı? (nümunə: ali@gmail.com)
   function isEmailValid(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
   }

   function handleSubmit(e) {
      e.preventDefault();

      const newErrors = {};

      if (!isEmailValid(email)) {
         newErrors.email = 'Email düzgün formatda deyil (məsələn: ali@gmail.com)';
      }

      if (password.length < 6) {
         newErrors.password = 'Şifrə ən azı 6 simvol olmalıdır';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
         navigate('/');
      }
   }

   return (
      <main className="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
         <div className="py-4 max-w-md w-full">
            <div className="p-8 md:p-10 rounded-md bg-white border border-gray-200">
               <div className="mb-8 flex justify-center">
                  <Link to="/"><img src={logo} alt="logo" className="h-9 w-auto" /></Link>
               </div>

               <div className="text-center">
                  <h1 className="text-[24px] font-bold uppercase tracking-tight mb-2">Welcome back</h1>
                  <p className="text-[14px] text-gray-500 font-light">Enter your email and password to sign in.</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6 mt-10">
                  <div>
                     <label htmlFor="email" className="mb-2 text-[13px] uppercase tracking-wide text-gray-600 font-light inline-block">Email</label>
                     <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ali@gmail.com"
                        className={`px-4 py-3 text-[15px] font-light rounded-md bg-white w-full border outline-none transition-colors ${
                           errors.email ? 'border-red-500' : 'border-gray-300 focus:border-black'
                        }`}
                     />
                     {errors.email && <p className="text-red-500 text-[12px] font-light mt-1">{errors.email}</p>}
                  </div>

                  <div className="relative">
                     <label htmlFor="password" className="mb-2 text-[13px] uppercase tracking-wide text-gray-600 font-light inline-block">Password</label>

                     <button
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        className="absolute top-[30px] right-3 text-[12px] font-light text-gray-500 hover:text-black cursor-pointer"
                     >
                        {isVisible ? "Hide" : "Show"}
                     </button>

                     <input
                        type={isVisible ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`px-4 py-3 text-[15px] font-light rounded-md bg-white w-full border outline-none transition-colors ${
                           errors.password ? 'border-red-500' : 'border-gray-300 focus:border-black'
                        }`}
                     />
                     {errors.password && <p className="text-red-500 text-[12px] font-light mt-1">{errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between text-[13px]">
                     <label className="flex items-center gap-2 font-light text-gray-600">
                        <input id="remember" name="remember" type="checkbox" className="accent-black" />
                        Remember me
                     </label>

                     <a href="#" className="font-light underline">Forgot password?</a>
                  </div>

                  <button type="submit" className="w-full py-3.5 uppercase text-[13px] font-medium tracking-wide rounded-md bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer">
                     Sign in
                  </button>
               </form>

               <div className="flex items-center gap-4 my-6">
                  <hr className="w-full border-gray-200" />
                  <p className="text-[13px] font-light text-gray-500">or</p>
                  <hr className="w-full border-gray-200" />
               </div>

               <a href="#" className="w-full flex items-center justify-center gap-2.5 py-3 text-[13px] font-medium uppercase tracking-wide rounded-md border border-gray-300 hover:border-black transition-colors cursor-pointer">
                  Sign in with Google
               </a>

               <p className="mt-6 text-[13px] font-light text-center text-gray-600">
                  Don't have an account?
                  <a href="#" className="underline ml-1 font-medium text-black">Sign up</a>
               </p>
            </div>
         </div>
      </main>
   );
}