'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { LoginSchema } from '@/lib/schemas';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { login } from '@/actions/login';
import { getUserByEmail, getUserById, getUserEmailById } from '@/data/User';

export const LoginForm = ({ modal }: { modal?: boolean }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const refferer = searchParams.get('refferer');
  const [email, setEmail] = useState<string>('');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  });

  useEffect(() => {
    const getEmail = async () => {
      if (refferer) {
        const userEmail = await getUserEmailById(refferer);
        if (userEmail) {
          setEmail(userEmail);
          form.setValue('email', userEmail);
        }
      }
    };

    getEmail().catch(() => {
      form.setValue('email', '');
    });
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    console.log({ showTwoFactor, isPending, success, error });
    startTransition(() => {
      login(values, callbackUrl)
        .then((data: any) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError('Something went wrong'));
    });
  };

  return (
    <CardWrapper
      headerLabel={modal ? 'Use one of the providers' : 'Welcome back'}
      backButtonLabel={modal ? '' : "Don't have an account?"}
      backButtonHref={modal ? '/settings/accounts' : '/auth/register'}
      showSocial
      callbackUrl={callbackUrl || '/settings'}
    >
      {!modal && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='123456'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder='john.doe@example.com'
                            type='email'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder='******'
                            type='password'
                          />
                        </FormControl>
                        <Button
                          size='sm'
                          variant='link'
                          asChild
                          className='px-0 font-normal'
                        >
                          <Link href='/auth/reset-password'>
                            Forgot password?
                          </Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type='submit' className='w-full'>
              {showTwoFactor ? 'Confirm' : 'Login'}
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};
