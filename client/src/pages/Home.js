
import { Col, message, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import  { useEffect, useState } from "react";
import Bus from "../components/Bus";
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertSlice";

const Home = () => {
   const {user} = useSelector((state) => state.users);
   const dispatch = useDispatch();
   const [buses, setBuses] = useState([]);

   const getBus = async () => {
    try{
      dispatch(showLoading)
      const response = await axiosInstance.get('/api/buses/get-all-bus', {})
      console.log(response)
      dispatch(hideLoading)
      if(response.data.success){
        setBuses(response.data.data)
      } else {
        message.error(response.data.message)
      }
    } catch(err){
      message.error(err.message)
    }
    
  }

  useEffect(() => {
    getBus()
  },[])
  console.log(user)
  return (
    <div>
    <div className="my-3 py-1">
      <Row gutter={10} align="center">
        <Col lg={6} sm={24}>
         
        </Col>
        <Col lg={6} sm={24}>
          
        </Col>
        <Col lg={6} sm={24}>
          
        </Col> 
        <Col lg={6} sm={24}>
          
        </Col>
      </Row>
    </div>
    <div>
      <Row gutter={[15, 15]}>
        {buses
          .map((bus) => (
            <Col lg={12} xs={24} sm={24}>
              <Bus bus={bus} />
            </Col>
          ))}
      </Row>
    </div>
  </div>
  )
}

export default Home
