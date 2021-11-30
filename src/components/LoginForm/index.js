import React, { useState } from 'react'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import { loginState$ } from '../../redux/selectors';
import { Box } from '@mui/system';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginForm() {
  const { isLoading } = useSelector(loginState$);
  const { status } = useSelector(loginState$);
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Enter your username'),
    password: Yup.string().required('Enter password to continue')
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      dispatch(actions.login.loginRequest({
        "username": formik.values.username,
        "password": formik.values.password
      }))
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };


  return (
    <Box sx={{ width: '50%' }}>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography style={{ color: 'red', fontSize: 20 }}>{status}</Typography>
            <TextField
              fullWidth
              autoComplete="username"
              type="text"
              label="Username"
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}

            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}

            />
          </Stack>
          <Divider />
          <Stack spacing={3}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Login
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  )
}
