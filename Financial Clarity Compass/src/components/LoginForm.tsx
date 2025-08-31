import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Shield } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useToast } from '@/hooks/use-toast';

type LoginStep = 'email' | 'otp';

export function LoginForm() {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  const { sendOTP, verifyOTP, isLoading, error, clearError } = useAuthStore();
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    try {
      await sendOTP(email.trim());
      setStep('otp');
      toast({
        title: "Code Sent",
        description: "Check your email for the verification code"
      });
    } catch (error) {
      console.error('Send OTP error:', error);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      toast({
        title: "Code Required", 
        description: "Please enter the verification code",
        variant: "destructive"
      });
      return;
    }

    try {
      await verifyOTP(email, otp.trim());
      toast({
        title: "Welcome to FinanceFlow!",
        description: "Successfully logged in to your finance dashboard"
      });
    } catch (error) {
      console.error('Verify OTP error:', error);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    clearError();
  };

  return (
    <Card className="finance-card">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          {step === 'email' ? (
            <>
              <Mail className="h-5 w-5 text-emerald-600" />
              Sign In to FinanceFlow
            </>
          ) : (
            <>
              <Shield className="h-5 w-5 text-blue-600" />
              Enter Verification Code
            </>
          )}
        </CardTitle>
        <CardDescription>
          {step === 'email' 
            ? 'Enter your email to get started with your financial journey'
            : `We sent a verification code to ${email}`
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 'email' ? (
          <div key="email">
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="text-base"
                  autoComplete="email"
                  autoFocus
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </Button>
            </form>
          </div>
        ) : (
          <div key="otp">
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isLoading}
                  className="text-base text-center tracking-widest"
                  maxLength={6}
                  autoComplete="one-time-code"
                  autoFocus
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Sign In'
                )}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={handleBackToEmail}
                disabled={isLoading}
              >
                Back to Email
              </Button>
            </form>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            We'll send you a secure verification code to access your financial data
          </p>
        </div>
      </CardContent>
    </Card>
  );
}