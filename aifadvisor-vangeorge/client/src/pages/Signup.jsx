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

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const Signup = () => {
  const [message, setMessage] = useState(null);
  const theme = useTheme();

  const register = async (event) => {
    event.preventDefault();
    setMessage(null);

    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    };

    try {
      const req = await fetch('http://127.0.0.1:1337/api/auth/local/register', reqOptions);
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        return;
      }

      if (res.jwt && res.user) {
        setMessage('Successful registration.');
        localStorage.setItem('jwt', res.jwt);
        window.location.href = '/dashboard'; 
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Registration error:', error);
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
          Sign Up
        </Typography>
      </Box>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true }));
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form onSubmit={register}>
            <FormControl
              fullWidth
              error={!!errors.username && touched.username}
              sx={{ marginBottom: 4 }}
            >
              <Field
                as={TextField}
                id="username"
                name="username"
                label="Username"
                placeholder="Enter your username"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { backgroundColor: 'white' },
                }}
              />
              {!!errors.username && touched.username && (
                <FormHelperText>{errors.username}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!errors.email && touched.email}
              sx={{ marginBottom: 4 }}
            >
              <Field
                as={TextField}
                id="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { backgroundColor: 'white' },
                }}
              />
              {!!errors.email && touched.email && (
                <FormHelperText>{errors.email}</FormHelperText>
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

            <FormControl
              fullWidth
              error={!!errors.confirmPassword && touched.confirmPassword}
              sx={{ marginBottom: 4 }}
            >
              <Field
                as={TextField}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { backgroundColor: 'white' },
                }}
              />
              {!!errors.confirmPassword && touched.confirmPassword && (
                <FormHelperText>{errors.confirmPassword}</FormHelperText>
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
                'Sign Up'
              )}
            </Button>
            <Typography
              variant="h6"
              align="center"
              sx={{ marginTop: 4, color: 'white' }}
            >
              Already have an account? Please{' '}
              <Link href="/" sx={{ color: '#41f2d3' }}>
                Login
              </Link>
              .
            </Typography>
            {message && (
              <Typography color="red" sx={{ marginTop: 4 }}>
                {message}
              </Typography>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default Signup