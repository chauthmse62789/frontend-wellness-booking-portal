import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { modalState$ } from '../../redux/selectors';
import * as actions from '../../redux/actions'
import { FormControl, Grid, InputLabel, MenuItem, Select, Slide, Stack } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import { Box } from '@mui/system';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function CreateBookingModal() {
    const { isShow } = useSelector(modalState$);
    const dispatch = useDispatch();
    const [dataForm, setDataForm] = React.useState({
        wellnessType: 'Health Talk',
        location: '',
        proposedDatetime: {
            datetime1: new Date(),
            datetime2: new Date(),
            datetime3: new Date()
        }
    })


    const onChange = (e) => {
        setDataForm(
            { ...dataForm, [e.target.name]: e.target.value });
    }

    const handleClose = React.useCallback(() => {
        dispatch(actions.hideModal())
        setDataForm({
            wellnessType: 'Health Talk',
            location: '',
            proposedDatetime: {
                datetime1: new Date(),
                datetime2: new Date(),
                datetime3: new Date()
            }
        })
    }, [dispatch])

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        dispatch(actions.createBooking.createBookingRequest(dataForm))
        handleClose()
    }, [dispatch, dataForm, handleClose])

    return (
        <Dialog TransitionComponent={Transition} open={isShow} onClose={handleClose} maxWidth='md' fullWidth={true}>
            <DialogTitle>Create New Booking Ticket</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action will generate a new booking
                </DialogContentText>

                <Box sx={{ width: '100%', mt: "3rem" }}  >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Stack direction="column"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                spacing={5}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Wellness Type*</InputLabel>
                                    <Select
                                        name="wellnessType"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={dataForm.wellnessType}
                                        label="Wellness Type*"
                                        onChange={onChange}
                                    >
                                        <MenuItem value='Health Talk' >Health Talk</MenuItem>
                                        <MenuItem value='Wellness Events'>Wellness Events</MenuItem>
                                        <MenuItem value='Fitness Activities'>Fitness Activities</MenuItem>

                                    </Select>
                                </FormControl>
                                <TextField
                                    name="location"
                                    margin="normal"
                                    id="standard-basic"
                                    fullWidth
                                    label="Location"
                                    value={dataForm.location}
                                    onChange={onChange}
                                />
                            </Stack>
                        </Grid>


                        <Grid item xs={6}>
                            <Stack direction="column"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                spacing={5}>
                            <LocalizationProvider dateAdapter={DateAdapter}  >
                            <MobileDateTimePicker
                                renderInput={(props) => <TextField  {...props} />}
                                label="Proposed Datetime 1"
                                value={dataForm.proposedDatetime.datetime1}
                                onChange={(newValue) => {
                                            setDataForm({ ...dataForm, proposedDatetime: { ...dataForm.proposedDatetime, datetime1: newValue } });
                                        }}
                            />

                            <MobileDateTimePicker
                                renderInput={(props) => <TextField  {...props} />}
                                label="Proposed Datetime 2"
                                value={dataForm.proposedDatetime.datetime2}
                                onChange={(newValue) => {
                                        setDataForm({ ...dataForm, proposedDatetime: { ...dataForm.proposedDatetime, datetime2: newValue } });
                                    }}
                            />
                            <MobileDateTimePicker
                                renderInput={(props) => <TextField  {...props} />}
                                label="Proposed Datetime 3"
                                value={dataForm.proposedDatetime.datetime3}
                                onChange={(newValue) => {
                                            setDataForm({ ...dataForm, proposedDatetime: { ...dataForm.proposedDatetime, datetime3: newValue } });
                                        }}
                            />
                            </LocalizationProvider>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}
