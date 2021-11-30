import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { approveModalState$ } from '../../redux/selectors';
import * as actions from '../../redux/actions'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slide, Stack } from '@mui/material';
import moment from 'moment';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ArrpoveBooking(props) {

    const { isShow } = useSelector(approveModalState$);
    const dispatch = useDispatch();

    const [chooseProposedDate, setChooseProposedDate] = React.useState(1);

    const handleChange = (event) => {
        setChooseProposedDate(event.target.value);
    };



    const handleClose = React.useCallback(() => {
        dispatch(actions.hideApproveModal())

    }, [dispatch])



    const handleSubmitApproveBooking = React.useCallback((e) => {
        e.preventDefault();
        const payloadString = `{
            "approveDatetime": {
                "${chooseProposedDate}":true
            }
        }`
        const payload = JSON.parse(payloadString)
        dispatch(actions.approveBooking.approveBookingRequest({
            id: props.id,
            data: payload

        }))
        handleClose()
    }, [chooseProposedDate, dispatch, handleClose, props.id]);




    return (
        <Dialog TransitionComponent={Transition} open={isShow} onClose={handleClose} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Approve Booking Ticket</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action will approve this booking, and please choose proposed date below
                </DialogContentText>
                <Stack direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={5} mt={3}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Proposed Date: </FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="controlled-radio-buttons-group"
                            value={chooseProposedDate}
                            onChange={handleChange}
                        >
                            {props.dataDate.map((item, id = 0) => <Stack key={id} direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={1}>
                                <FormControlLabel value={++id} control={<Radio />} label={`${id}. ${moment(item).format('MMMM Do YYYY, h:mm:ss a')}`} />
                                <Button variant="contained" onClick={handleSubmitApproveBooking} >Confirm</Button>
                            </Stack>)}
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
