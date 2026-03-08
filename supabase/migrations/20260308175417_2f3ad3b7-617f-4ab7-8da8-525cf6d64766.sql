UPDATE auth.users 
SET email_confirmed_at = now(), 
    updated_at = now() 
WHERE email = 'test.customer@wyw-demo.com' 
  AND email_confirmed_at IS NULL;