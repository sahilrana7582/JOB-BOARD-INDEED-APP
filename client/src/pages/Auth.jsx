import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSignInMutation, useSignUpMutation } from '@/features/api/authApi';
import { Password } from '@mui/icons-material';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function Auth() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.User.user);
  const [singUpQuery, { isLoading, isError, isSuccess, data }] =
    useSignUpMutation();

  const [
    signInQuery,
    {
      isLoading: signInLoading,
      isSuccess: signInSuccess,
      isError: signInError,
    },
  ] = useSignInMutation();
  const { register, handleSubmit, reset } = useForm({});

  const onSubmitHandler = async (data, type) => {
    try {
      const action = type === 'signup' ? singUpQuery : signInQuery;
      await action(data);
    } catch (e) {
      console.log(e, 'error while sending auth Data Auth Page');
    } finally {
      reset({ firstName: '', lastName: '', email: '', password: '' });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account Created Successfully');
    }
    if (isError) {
      toast.success('Something Goes Wrong');
    }
    if (signInSuccess) {
      toast.success('Welcome Back');
      if (user?.onBoard) {
        navigate('/');
      } else {
        navigate('/On-Boarding');
      }
    }
    if (signInError) {
      toast.success('Something Goes Wrong');
    }
  }, [isSuccess, isError, signInSuccess, signInError]);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="h-screen shadow-lg flex flex-col justify-center gap-10 items-center">
        <div className="space-y-2">
          <p className="text-xl text-muted-foreground">For Recruiter</p>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <small className="text-sm font-medium leading-none">
              Email address
            </small>
            <small className="text-sm font-medium leading-none">
              test1@gmail.com
            </small>
            <small className="text-sm font-medium leading-none">Password</small>
            <small className="text-sm font-medium leading-none">1234</small>
          </div>
        </div>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Sign Up</TabsTrigger>
            <TabsTrigger value="password">Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Sign Up</CardTitle>
                <CardDescription className="text-center">
                  Create a New Account Here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="First Name"
                      {...register('firstName', { required: true })}
                    />
                  </div>{' '}
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last Name"
                      {...register('lastName', { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4">
                <Button variant="destructive" onClick={() => reset({})}>
                  Reset
                </Button>
                <Button
                  onClick={handleSubmit((data) =>
                    onSubmitHandler(data, 'signup')
                  )}
                >
                  {isLoading ? (
                    <LoaderCircle className="w-16 h-16 animate-spin" />
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Sign In</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4">
                <Button variant="outline">Sign Up</Button>
                <Button
                  onClick={handleSubmit((data) =>
                    onSubmitHandler(data, 'signin')
                  )}
                >
                  {signInLoading ? (
                    <LoaderCircle className="w-16 h-16 animate-spin" />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="space-y-2">
          <p className="text-xl text-muted-foreground">For Candidate</p>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <small className="text-sm font-medium leading-none">
              Email address
            </small>
            <small className="text-sm font-medium leading-none">
              test5@gmail.com
            </small>
            <small className="text-sm font-medium leading-none">Password</small>
            <small className="text-sm font-medium leading-none">1234</small>
          </div>
        </div>
      </div>
      <div class="relative bg-black col-span-2 flex justify-center items-center text-center px-6">
        <img
          src="/loginBG.jpeg"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Login background image"
        />

        <h2 class="text-white text-3xl sm:text-4xl font-semibold leading-snug tracking-wide shadow-md animate-fade-in relative z-10">
          🚀 Unlock your career potential. <br />
          <span class="text-gradient">
            Sign in to explore exciting job opportunities and connect with top
            employers 👩‍💻👨‍💻.
          </span>
        </h2>
        <div class="border-t-2 border-blue-400 mt-6 w-1/3 mx-auto"></div>
      </div>
    </div>
  );
}
