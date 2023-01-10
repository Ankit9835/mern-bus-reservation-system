import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertSlice";

const BookNow = () => {
 const [selectedSeats,setSelectedSeats] = useState([])
 const params = useParams();
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const [bus, setBus] = useState(null);
 const getBus = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  const bookNow = async () => {
     try{
        dispatch(showLoading());
        const response = await axiosInstance.post('/api/bookings/book-seat',{
          bus:bus._id,
          seats:selectedSeats,
        })
        console.log(response)
        dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
     } catch(error){
      dispatch(hideLoading());
      message.error(error.message);
     }
  }
  useEffect(() => {
    getBus();
  }, []);
  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={[30, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl primary-text">{bus.name}</h1>
            <h1 className="text-md">
              {bus.from} - {bus.to}
            </h1>
            <hr />

            <div className="flex flex-col gap-2">
              <p className="text-md">
                Jourey Date : {bus.journeyDate}
              </p>
              <p className="text-md">
                Fare : $ {bus.fare} /-
              </p>
              <p className="text-md">
                Departure Time : {bus.departure}
              </p>
              <p className="text-md">
                Arrival Time : {bus.arrival}
              </p>
              <p className="text-md">
                Capacity : {bus.capacity}
              </p>
              <p className="text-md">
                Seats Left : 
              </p>
            </div>
            <hr />

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">
                Selected Seats : {selectedSeats.join(', ')}
              </h1>
              <h1 className="text-2xl mt-2">
                Fare : $ {bus.fare * selectedSeats.length}
              </h1>
              <hr />

              <button
                  className={`primary-btn ${
                    selectedSeats.length === 0 && "disabled-btn"
                  }`}
                  disabled={selectedSeats.length === 0}
                  onClick={bookNow}
                >
                  Book Now
                </button>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection 
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            bus={bus}

            />
          </Col>
        </Row>
      )}
    </div>
  )
}

export default BookNow