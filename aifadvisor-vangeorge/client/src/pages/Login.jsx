import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LoginSchema = Yup.object().shape({
  identifier: Yup.string().required('Username or Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [message, setMessage] = useState(null);
  const theme = useTheme();

  const login = async (event) => {
    event.preventDefault();
    setMessage(null);
    
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    };

    try {
      const req = await fetch('http://127.0.0.1:1337/api/auth/local', reqOptions);
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        return;
      }

      if (res.jwt && res.user) {
        setMessage('Login successful.');
        localStorage.setItem('jwt', res.jwt);
        window.location.href = '/dashboard'; 
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <Box
      sx={{
        width: '50%',
        marginLeft: '25%',
        marginTop: '15%',
        overflowX: 'hidden',
      }}
    >
      <Box sx={{ marginBottom: theme.spacing(4) }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="#41f2d3"
          gutterBottom
        >
          Login
        </Typography>
      </Box>
      <Formik
        initialValues={{ identifier: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const event = {
            preventDefault: () => {},
            target: document.querySelector('form')
          };
          await login(event);  
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormControl
              fullWidth
              error={!!errors.identifier && touched.identifier}
              sx={{ marginBottom: 4 }}
            >
              <Field
                as={TextField}
                id="identifier"
                name="identifier"
                type="text"
                label="Username or Email"
                placeholder="Enter your username or email"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { backgroundColor: 'white' },
                }}
              />
              {!!errors.identifier && touched.identifier && (
                <FormHelperText>{errors.identifier}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!errors.password && touched.password}
              sx={{ marginBottom: 4 }}
            >
              <Field
                as={TextField}
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { backgroundColor: 'white' },
                }}
              />
              {!!errors.password && touched.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 4,
                backgroundColor: '#41f2d3',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#36d1ba',
                },
              }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
            {message && <div>{message}</div>}
            <Typography
              variant="h6"
              align="center"
              sx={{ marginTop: 4, color: 'white' }}
            >
              Don't have an account? Please{' '}
              <Link href="/signup" sx={{ color: '#41f2d3' }}>
                Sign Up
              </Link>
              .
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default Login