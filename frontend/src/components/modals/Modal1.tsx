import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type props = {
  modalTitle:React.ReactNode,
  title?:string,
  show:boolean,
  setShow?:React.Dispatch<React.SetStateAction<boolean>>,
  edit?:boolean,
  editData?:Array<string> | string,
  editId?:string,
  handleSave?:(data:any)=>void,
  value?:string,
  handleEdit?:(value:string)=>void
}

export default function Modal1(props:props) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClickOpen = () => {
    setOpen(true);
    props.setShow && props.setShow(true)
    
  };
  const handleClose = () => {
    setOpen(false);
    props.setShow && props.setShow(false)
  };

  const handleSave = ()=>{
    if(props.edit){
      if(inputRef.current){
        if(inputRef.current?.value?.length > 0){
          props?.handleEdit && props?.handleEdit(inputRef.current.value);
          setOpen(false)
          props?.setShow && props.setShow(false)
        }
      }  
    }
    else{
      if(inputRef.current){
        if(inputRef.current?.value?.length > 0){
          props.handleSave && props.handleSave({id:props.title,value:inputRef.current.value});
          props.setShow && props.setShow(false)
        }
      }
    }
  }

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        {props.modalTitle || ""}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.show}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {props.title || "Modal Title"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div>
            <Input type="text" placeholder='Please add todo' required={true} defaultValue={props?.value} inputRef={inputRef} />
          </div>
          {/* <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave}>
            {props.edit?"EDIT":"ADD"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}


