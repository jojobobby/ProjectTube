import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Roboto", sans-serif',
  color: theme.palette.text.primary,
  // Add any other common typography styles you want to enforce
}));

export default CustomTypography;
