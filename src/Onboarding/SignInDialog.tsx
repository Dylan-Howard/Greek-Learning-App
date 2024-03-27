import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import './Onboarding.css';

import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

export default function SignInDialog(
  { show }: { show: boolean },
) {
  const [open, setOpen] = useState(show);
  const { instance } = useMsal();

  if (!show) { return <span />; }

  const handleClose = () => {
    setOpen(false);
  };

  // const handleLogin = (loginType) => {
  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
    // if (loginType === "popup") {
    //   instance.loginPopup(loginRequest).catch((e) => {
    //     console.log(e);
    //   });
    // } else if (loginType === "redirect") {
    //   instance.loginRedirect(loginRequest).catch((e) => {
    //     console.log(e);
    //   });
    // }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleLogin();
          handleClose();
        },
      }}
      sx={{ p: 2 }}
    >
      <DialogTitle>Welcome, Scholar!</DialogTitle>
      <DialogContent sx={{ mb: 2 }}>
        <DialogContentText sx={{ pb: 2 }}>
          Sign in below
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          type="submit"
        >
          Sign in
        </Button>
      </DialogActions>
    </Dialog>
  );
}
