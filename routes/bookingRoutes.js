const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../models/bookingModels");
const Bus = require("../models/busModels");

router.post('/book-seat', authMiddleware, async (req,res) => {
    try{
        const existingBooking = await Booking.findOne({seats:req.body.seats})
        console.log(existingBooking)
        if(existingBooking){
           return res.send({
                message: "Seats already reserved",
                success: false,
              });
        }
        const newBooking = new Booking({
            ...req.body,
            user:req.body.userId,
            transactionId:'12313212'
        })
        await newBooking.save()
        const bus = await Bus.findById(req.body.bus)
        bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats]
        await bus.save()
        res.status(200).send({
            message: "Booking successful",
            data: newBooking,
            success: true,
          });
    } catch(error){
        res.status(500).send({
            message: "Booking failed",
            data: error,
            success: false,
          });
    }
})

module.exports = router