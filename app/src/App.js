import { useState } from "react";
import axios from "axios";
import logo from './assets/logo.png';

function App() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value})
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      console.log('form',form)
      const { data, status } = await axios.post("http://localhost:8000/", form);
      if (status === 200) {
        console.log("Success", data);
      }
      console.log("status code", status);
    } catch (ex) {
      console.error("Error", ex);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-screen">
      <section className="flex justify-center items-center h-full px-4 sm:px-6 md:px-8">

        <div className="w-full max-w-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-[#E92928]">Sign In</h2>
          <p className="text-sm text-[#A3AED0]">
            Enter your email and password to sign in!
          </p>

          <div className="flex items-center">
            <hr className="flex-grow border-t border-[#A3AED0]" />
            <span className="text-[#A3AED0] mx-4">or</span>
            <hr className="flex-grow border-t border-[#A3AED0]" />
          </div>

          <form onSubmit={submitForm} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="mail@simmmple.com"
                className="w-full px-4 py-2 mt-1 text-sm border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password*
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-2 mt-1 text-sm border rounded-lg"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#E92928]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12h.01M9 12h.01M12 12h.01M12 9h.01M12 6h.01M15 6h.01M9 6h.01M6 15h.01M18 15h.01M6 12h.01M6 9h.01M18 12h.01M18 9h.01"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 border-gray-300 rounded"
                />
                Keep me logged in
              </label>
              <a href="#" className="text-sm text-[#E92928] hover:underline">
                Forget password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-[#E92928] rounded-lg"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Not registered yet?{" "}
            <a href="#" className="text-[#E92928] hover:underline">
              Create an Account
            </a>
          </p>
        </div>
      </section>

      <section className="hidden md:flex h-full bg-[url('./assets/Image.png')] bg-cover bg-center flex-col items-center justify-center relative">
        <img src={logo} alt="logo" className="h-auto w-96 mb-40" />
        <div className="absolute bottom-10 flex gap-4 text-white">
          <a href="/license" className="hover:underline">License</a>
          <a href="/terms" className="hover:underline">Term of Use</a>
          <a href="/blog" className="hover:underline">Blog</a>
        </div>
      </section>
    </div>
  );
}

export default App;
