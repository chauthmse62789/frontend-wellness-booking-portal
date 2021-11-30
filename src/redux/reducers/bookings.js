import { INIT_STATE } from "../../constant";
import { createBooking, getBookings, getType, deleteBooking, rejectBooking, approveBooking, getBookingByID } from "../actions";

export default function bookingsReducers(state = INIT_STATE.bookings, action) {

    switch (action.type) {


// GET BOOKINGS ---------------------------------------------------
        case getType(getBookings.getBookingRequest):
            return {
                ...state,
                isLoading: true
            } 

        case getType(getBookings.getBookingSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            } 
        case getType(getBookings.getBookingFailure):
            return {
                ...state,
                isLoading: false
            } 
//END GET BOOKINGS---------------------------------------------------






//CREATE BOOKING  ---------------------------------------------------
        case getType(createBooking.createBookingSuccess):
            return {
                ...state,
                data: [...state.data, action.payload]
            };
//END CREATE BOOKING  ----------------------------------------------





// GET BOOKING BY ID ----------------------------------------------
        case getType(getBookingByID.getBookingByIDRequest):
            return {
                ...state,
                isLoading: true
            }


        case getType(getBookingByID.getBookingByIDSuccess):
                const arrProposedDate = [action.payload.datetime1,action.payload.datetime2,action.payload.datetime3]
            return {
                ...state,
                isLoading: false,
                dataGetByID:arrProposedDate
            }

        case getType(getBookingByID.getBookingByIDFailure):
            return {
                ...state,
                isLoading: false
            }
// END GET BOOKING BY ID -----------------------------------------------------





// DELETE BOOKING 

        case getType(deleteBooking.deleteBookingRequest):
            return {
                ...state,
                isLoading: true
            };



        case getType(deleteBooking.deleteBookingSuccess):

            const filteredBooking = state.data.filter(booking => booking._id !== action.payload._id);
           
            return {
                ...state,
                isLoading: false,
                data: filteredBooking
            };


        case getType(deleteBooking.deleteBookingFailure):
            return {
                ...state,
                isLoading: false
            };
//END DELETE BOOKING -------------------------------------------------------------




//REJECT BOOKING -----------------------------------------------------------------
        case getType(rejectBooking.rejectBookingRequest):
            return {
                ...state,
                isLoading: true
            };



        case getType(rejectBooking.rejectBookingSuccess):
            return {
                ...state,
                isLoading: false,
                data: state.data.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                )
            };

        case getType(rejectBooking.rejectBookingFailure):

            return {
                ...state,
                isLoading: false
            };

//END REJECT BOOKING -----------------------------------------------------------






// APPROVE BOOKING -----------------------------------------------------------


        case getType(approveBooking.approveBookingRequest):
            return {
                ...state,
                isLoading: true
            };



        case getType(approveBooking.approveBookingSuccess):
            return {
                ...state,
                isLoading: false,
                data: state.data.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                )
            };

        case getType(approveBooking.approveBookingFailure):

            return {
                ...state,
                isLoading: false
            };

//END  APPROVE BOOKING -----------------------------------------------------------




        default:
            return state;
    }

}