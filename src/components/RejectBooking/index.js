import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { rejectModalState$ } from '../../redux/selectors';
import * as actions from '../../redux/actions'
import { Slide, Stack } from '@mui/material';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function RejectBooking(props) {
    const { isShow } = useSelector(rejectModalState$);
    const dispatch = useDispatch();
    const [reasonReject, setReasonReject] = React.useState('')

    const handleClose = React.useCallback(() => {
        dispatch(actions.hideRejectModal())
        setReasonReject('')
    }, [dispatch])

    const handleSubmitRejectBooking = React.useCallback((e) => {
        e.preventDefault();

        dispatch(actions.rejectBooking.rejectBookingRequest({
            id:props.id,
            data:{ 
                    reasonReject: reasonReject
            }
        }))


        handleClose()
    }, [dispatch,props.id,reasonReject,handleClose])


    return (
        <Dialog TransitionComponent={Transition} open={isShow} onClose={handleClose} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Reject Booking Ticket</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action will reject this booking
                </DialogContentText>


                <Stack direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={5} mt={3}>

                    <TextField
                        id="outlined-multiline-static"
                        label="Reason Reject Booking"
                        multiline
                        rows={4}
                        placeholder='Enter reason...'
                        value={reasonReject}
                        onChange={(e) => setReasonReject(e.target.value)}
                        fullWidth
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmitRejectBooking}>Reject</Button>
            </DialogActions>
        </Dialog>
    )
}
