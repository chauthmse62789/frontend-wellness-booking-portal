import { createActions, createAction } from 'redux-actions'

export const getType = (reduxActions) => {
  return reduxActions().type;
}
//Request
//Success
//Error



export const login = createActions({
  loginRequest: (payload) => payload,
  loginSuccess: (payload) => payload,
  loginFailure: (err) => err,
});



export const logout = createActions({
  logoutRequest: (payload) => payload,
  logoutSuccess: undefined,
  logoutFailure: (err) => err,
});



export const getBookings = createActions({
  getBookingRequest: (payload) => payload,
  getBookingSuccess: (payload) => payload,
  getBookingFailure: (err) => err

})


export const getBookingByID = createActions({
  getBookingByIDRequest: (payload) => payload,
  getBookingByIDSuccess: (payload) => payload,
  getBookingByIDFailure: (err) => err
})



export const createBooking = createActions({
  createBookingRequest: (payload) => payload,
  createBookingSuccess: (payload) => payload,
  createBookingFailure: (err) => err,
});




export const deleteBooking = createActions({
  deleteBookingRequest: (payload) => payload,
  deleteBookingSuccess: (payload) => payload,
  deleteBookingFailure: (err) => err,
});


export const rejectBooking = createActions({
  rejectBookingRequest: (payload) => payload,
  rejectBookingSuccess: (payload) => payload,
  rejectBookingFailure: (err) => err,
});

export const approveBooking = createActions({
  approveBookingRequest: (payload) => payload,
  approveBookingSuccess: (payload) => payload,
  approveBookingFailure: (err) => err,
});


export const showModal = createAction('SHOW_CREATE_BOOKING_MODAL');
export const hideModal = createAction('HIDE_CREATE_BOOKING_MODAL');


export const showRejectModal = createAction('SHOW_REJECT_BOOKING_MODAL');
export const hideRejectModal = createAction('HIDE_REJECT_BOOKING_MODAL');


export const showAppoveModal = createAction('SHOW_APPROVE_BOOKING_MODAL');
export const hideApproveModal = createAction('HIDE_APPROVE_BOOKING_MODAL');