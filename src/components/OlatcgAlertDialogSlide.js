import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';





const Transition = React.forwardRef(function Transition(props, ref) {                               
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide (props) {
     const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    
    <div>
      <Button sx={{width:'75%', maxHeight: 50, margin: 'auto'}} variant="outlined" onClick={handleClickOpen}>
      {props.base.substring(0,10)+ "..."} 
      </Button>
      <Dialog sx={{maxWidth:'60vw', overflowWrap:'break-word', maxHeight: 500, margin: 'auto'}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Sequence"}</DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.base}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  };
export default AlertDialogSlide;
