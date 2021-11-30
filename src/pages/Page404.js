import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

export default function Page404() {
  return (
    <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h3" paragraph>
        Sorry, the page was not found!
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        Sorry, we couldn't find the page you're looking for. Perhaps you entered the wrong URL?
        Be sure to check spelling.
      </Typography>
      <Box
        component="img"
        src="https://bizflyportal.mediacdn.vn/bizflyportal/459/347/2020/06/02/17/37/70515910726734841.jpg"
        sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
      />
      <Button to="/" size="large" variant="contained" component={RouterLink}>
        Về Trang Chủ
      </Button>
    </Box>
  )
}
