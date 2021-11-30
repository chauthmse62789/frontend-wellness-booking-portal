import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions'
import { Chip, Stack } from '@mui/material';
import RejectBooking from '../RejectBooking';
import ArrpoveBooking from '../ArrpoveBooking';
import { proposedDate$ } from '../../redux/selectors';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardBooking(props) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const bookingByID = useSelector(proposedDate$);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openAlertReject, setOpenAlertReject] = React.useState(false);
  const [openAlertApprove, setOpenAlertApprove] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const handleCancelBooking = React.useCallback(() => {
    dispatch(actions.deleteBooking.deleteBookingRequest(props.idBooking))
  }, [dispatch, props.idBooking])



  const openArroveBookingModal = React.useCallback(() => {
    dispatch(actions.showAppoveModal())
    dispatch(actions.getBookingByID.getBookingByIDRequest(props.idBooking))
  }, [dispatch, props.idBooking])



  const openRejectBookingModal = React.useCallback(() => {
    dispatch(actions.showRejectModal())
  }, [dispatch])


  return (
    <Card key={props.keyy} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[400] }} aria-label="recipe">
            {/* {props.creator.slice(0, 1).toUpperCase()} */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={props.creator}
        subheader={moment(props.createdDate).format('MMMM Do YYYY, h:mm a')}
      />
      {localStorage.getItem('role') === 'Company HR User' ?
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleCancelBooking}><CancelIcon color="primary" />Cancel</MenuItem>
        </Menu> :
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={openArroveBookingModal}><CheckIcon color="success" />Approve</MenuItem>
          <ArrpoveBooking id={props.idBooking} dataDate={bookingByID} />
          <MenuItem onClick={openRejectBookingModal}><HighlightOffRoundedIcon color="warning" />Reject</MenuItem>
          <RejectBooking id={props.idBooking} />
        </Menu>}
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {props.wellnessType}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Location: {props.location}
        </Typography>
        <Stack direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
          mt={3}>
          {props.statusBooking === 'Pending Review' ?
            <Chip label={props.statusBooking} color="primary" /> : props.statusBooking === 'Approved' ?
              <Stack direction="row" justifyContent="flex-end"
                alignItems="flex-end" >
                <Collapse in={openAlertApprove}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpenAlertApprove(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {Object.values(props.approveDatetime).map((item, id=1) => {
                     
                      if (item === true) {
                        
                        return `Proposed Date ${++id}`
                      }
                      
                      return null
                    })}
                  </Alert>
                </Collapse>
                <Chip label={props.statusBooking} color="warning" onClick={() => {
                  setOpenAlertApprove(true);
                }} />
              </Stack> : <Stack direction="row" justifyContent="flex-end"
                alignItems="flex-end" >
                <Collapse in={openAlertReject}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpenAlertReject(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {props.reasonReject}
                  </Alert>
                </Collapse>

                <Chip label={props.statusBooking} color="success" onClick={() => {
                  setOpenAlertReject(true);
                }} />
              </Stack>}
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {Object.values(props.proposedDatetime).map((item, id = 0) =>
            <Typography key={id} variant="subtitle1" gutterBottom component="div">
              Proposed Date {++id} - {moment(item).format('DD/MM/YYYY, h:mm a')}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}