import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export enum FormStateType {
  LOGIN,
  REGISTER,
}

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

const LoginPage: React.FC = () => {
  const { login } = useAuth(); // Using AuthContext
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormStateType>(
    FormStateType.LOGIN
  );

  const [userLogin, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await userLogin({
        variables: { identifier: email, password },
      });

      if (data?.login) {
        login({
          id: data.login.user.id,
          username: data.login.user.username,
          email: data.login.user.email,
          token: data.login.jwt,
        });

        console.log("Login Success:", data.login.user.username);
        navigate("/homepage"); // Redirect to dashboard
      }
    } catch (e) {
      if (error) console.error("login error", error.message);
    }
  };

  const handleFormState = () => {
    setFormState((prevState) =>
      prevState === FormStateType.LOGIN
        ? FormStateType.REGISTER
        : FormStateType.LOGIN
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col shadow-2xl w-[450px] rounded-md p-8 space-y-6 bg-white text-center">
          {formState === FormStateType.REGISTER ? (
            <RegisterForm handleFormState={handleFormState} />
          ) : (
            <>
              <div className="text-center mb-5 space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground">
                  Enter your credentials to access your account
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-start space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="text-start space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    Forgot password?
                  </a>
                </div>

                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "SUBMIT"}
                </Button>
              </form>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
              <div className="text-center mt-4 text-sm">
                Don&apos;t have an account?{" "}
                <button
                  className="text-primary-500 hover:text-primary-600 font-medium"
                  onClick={handleFormState}
                >
                  Sign up
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default LoginPage;
