import { takeLatest, call, put } from "redux-saga/effects"
import * as actions from '../actions'
import * as api from '../../api'

function* fetchBookingSaga(action) {
  const bookings = yield call(api.fetchBookings,action.payload);
  yield put(actions.getBookings.getBookingSuccess(bookings.data.bookings))
}

function* createBookingSaga(action) {
  try {
    const booking = yield call(api.createBooking, action.payload);
    yield put(actions.createBooking.createBookingSuccess(booking.data.booking));
  } catch (err) {
    console.error(err);
    yield put(actions.createBooking.createBookingFailure(err));
  }
}

function* deleteBookingSaga(action) {
  try {
    const deletedBooking = yield call(api.deleteBooking,action.payload);
    yield put(actions.deleteBooking.deleteBookingSuccess(deletedBooking.data.booking));
  } catch (err) {
    console.error(err);
    yield put(actions.deleteBooking.deleteBookingFailure(err));
  }
}



function* rejectBookingSaga(action) {
  try {
    const rejectedBooking = yield call(api.rejectBooking,action.payload);
    yield put(actions.rejectBooking.rejectBookingSuccess(rejectedBooking.data.booking));
  } catch (err) {
    console.error(err);
    yield put(actions.rejectBooking.rejectBookingFailure(err));
  }
}


function* approveBookingSaga(action) {
  try {
    const approvedBooking = yield call(api.approveBooking,action.payload);
    yield put(actions.approveBooking.approveBookingSuccess(approvedBooking.data.booking));
  } catch (err) {
    console.error(err);
    yield put(actions.approveBooking.approveBookingFailure(err));
  }
}


function* getBookingByIDSaga(action) {
  try {
    const getBookingByID = yield call(api.getBookingByID,action.payload);
    yield put(actions.getBookingByID.getBookingByIDSuccess(getBookingByID.data.booking.proposedDatetime));
  } catch (err) {
    console.error(err);
    yield put(actions.getBookingByID.getBookingByIDFailure(err));
  }
}

function* loginSaga(action) {
  try {
    const login = yield call(api.login, action.payload);
    yield put(actions.login.loginSuccess(login.data));
  } catch (err) {
    console.error(err);
    yield put(actions.login.loginFailure(err));
  }
}

function* logoutSaga(action) {
  try {
    yield call(api.logout);
    yield put(actions.logout.logoutSuccess())
  } catch (err) {
    console.error(err);
    yield put(actions.logout.logoutFailure(err));
  }
}



function* mySaga() {
  yield takeLatest(actions.getBookings.getBookingRequest, fetchBookingSaga)
  yield takeLatest(actions.createBooking.createBookingRequest, createBookingSaga);
  yield takeLatest(actions.login.loginRequest, loginSaga);
  yield takeLatest(actions.logout.logoutRequest, logoutSaga);
  yield takeLatest(actions.deleteBooking.deleteBookingRequest, deleteBookingSaga);
  yield takeLatest(actions.getBookingByID.getBookingByIDRequest, getBookingByIDSaga);
  yield takeLatest(actions.rejectBooking.rejectBookingRequest, rejectBookingSaga);
  yield takeLatest(actions.approveBooking.approveBookingRequest, approveBookingSaga);
}


export default mySaga;