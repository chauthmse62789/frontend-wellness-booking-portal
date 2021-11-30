import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import CardBooking from '../components/CardBooking';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions'
import { bookingsState$ } from '../redux/selectors';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CreateBookingModal from '../components/CreateBookingModal';





export default function Dashboard(props) {

    const dispatch = useDispatch();
    const bookings = useSelector(bookingsState$)


    React.useEffect(() => {
        dispatch(actions.getBookings.getBookingRequest(localStorage.getItem('access_token')))
        
    }, [dispatch])

    const openCreatePostModal = React.useCallback(() => {
        dispatch(actions.showModal())
    }, [dispatch])




    return (<>
        <Header username={props.data.username}  />
        <Box sx={{ flexGrow: 1 }} mt={2} ml={2} >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }} alignItems="center">

                {bookings.map((booking, id = 0) => {
                   
                    return (<Grid key={++id} item xs={12} sm={4} md={3}>
                            <CardBooking
                                wellnessType={booking.wellnessType}
                                location={booking.location}
                                statusBooking={booking.statusBooking}
                                reasonReject={booking.reasonReject}
                                createdDate={booking.createdAt}
                                approveDatetime={booking.approveDatetime}
                                proposedDatetime={booking.proposedDatetime}
                                permission={props.data.role}
                                idBooking={booking._id}
                                creator={booking.creator.username}
                                keyy={++id}
                            />
                             </Grid>)
                })}

                <CreateBookingModal />
                {localStorage.getItem('role') === 'Company HR User'? <Fab color="primary" aria-label="add" style={{ position: 'fixed',
        bottom: '30px',
        right: '20px'}} onClick={openCreatePostModal}>
                    <AddIcon /> 
                </Fab>:<></>}
                



            </Grid>
        </Box>




    </>

    )
}
