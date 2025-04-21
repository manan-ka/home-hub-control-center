
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/components/AuthProvider';

const Auth = () => {
  const [form, setForm] = useState({ email: '', password: '', displayName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        await register(form.email, form.password, form.displayName);
        toast({
          title: "Success!",
          description: "Account created. You are now signed in.",
        });
        navigate('/');
      } else {
        await login(form.email, form.password);
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Authentication failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="mt-2 text-gray-600">
            {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
            </div>
            {isSignUp ? (
              <div>
                <Input
                  type="text"
                  placeholder="Display Name"
                  value={form.displayName}
                  onChange={(e) => setForm(f => ({ ...f, displayName: e.target.value }))}
                  required
                />
              </div>
            ) : null}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
