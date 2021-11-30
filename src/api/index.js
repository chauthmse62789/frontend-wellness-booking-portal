import CallAPI from '../services/CallAPI';

const URL = 'http://localhost:5000';

const logoutFunc = () =>{
  localStorage.removeItem('access_token')
  localStorage.removeItem('username')
  localStorage.removeItem('role')
}

const jwt = localStorage.getItem('access_token')
export const fetchBookings = (payload)=>CallAPI(`${URL}/api/bookings`,'GET',null,payload)
export const createBooking = (payload) => CallAPI(`${URL}/api/bookings`,'POST',payload,jwt)
export const deleteBooking = (payload) => CallAPI(`${URL}/api/bookings/${payload}`,'DELETE',null,jwt);
export const rejectBooking = (payload) => CallAPI(`${URL}/api/bookings/${payload.id}/reject`,'PUT',payload.data,jwt);
export const approveBooking = (payload) => CallAPI(`${URL}/api/bookings/${payload.id}/approve`,'PUT',payload.data,jwt);
export const getBookingByID = (payload) => CallAPI(`${URL}/api/bookings/${payload}`,'GET',payload,jwt);
export const login = (payload) => CallAPI(`${URL}/api/auth/login`,'POST',payload)
export const logout = () => logoutFunc()


