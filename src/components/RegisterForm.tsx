import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, gql } from "@apollo/client";

interface RegisterFormPropsType {
  handleFormState: () => void;
}

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
        role {
          name
        }
      }
    }
  }
`;

const RegisterForm: React.FC<RegisterFormPropsType> = (props) => {
  const { handleFormState } = props;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Correctly destructure the useMutation hook
  const [registerUser, { loading, error, data }] =
    useMutation(REGISTER_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        variables: { username, email, password },
      });

      console.log("Registration success", response.data.register.user.username);

      // Optionally switch back to the login form
    } catch (err) {
      if (error) console.error("login error", error.message);
      console.error("Registration error", err);
    }
  };

  return (
    <>
      <div className="text-center mb-5 space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Welcome</h1>
        <p className="text-muted-foreground">Register your new account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-start space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="username"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Registering..." : "REGISTER"}
        </Button>

        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <button
            className="text-primary-500 hover:text-primary-600 font-medium"
            onClick={handleFormState}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
