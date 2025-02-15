import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: theme.spacing(1, 3),
  textTransform: 'none', // Prevent automatic uppercase transformation
  fontWeight: 'bold',
  // You can also add hover effects or other state-specific styles here.
}));

export default CustomButton;
