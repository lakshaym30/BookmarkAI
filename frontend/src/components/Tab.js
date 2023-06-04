// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
import ChatIcon from '@mui/icons-material/Chat';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';

// export default function ColorTabs() {
//   const [value, setValue] = React.useState('one');

//   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         aria-label="secondary tabs example"
//       >
//         <Tab icon={<ChatIcon />} iconPosition="start" label="All" />
//         <Tab icon={<ArticleIcon />} iconPosition="start" label="Text" />
//         <Tab icon={<ImageIcon />} iconPosition="start" label="Image" />
//       </Tabs>
//     </Box>
//   );
// }

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const AntTabs = styled(Tabs)({
  borderBottom: '1.5px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);



export default function CustomizedTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: '#fff'}}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" sx={{pl: 36}}>
          <AntTab onClick={() => navigate('/browse')} sx={{fontSize: "18px"}} icon={<ChatIcon />} iconPosition="start" label="All" />
          <AntTab onClick={() => navigate('/browse')} sx={{fontSize: "18px"}} icon={<ArticleIcon />} iconPosition="start" label="Text"  />
          <AntTab onClick={() => navigate('/images')} sx={{fontSize: "18px"}} icon={<ImageIcon />} iconPosition="start" label="Image"/>
        </AntTabs>
        <Box sx={{ p: 0}} />
      </Box>
    </Box>
  );
}