/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();
const SendOtp = require('sendotp');

const sendOtp = new SendOtp('193031Aw2btqWboT55a5a357f');

router.post('/', function (req, res) {
    const otp = req.body.otp;
    const mobile = req.body.mobile;
    console.log(otp+ " " + mobile);
     return res.json({
                status : "200"
            });
    // sendOtp.send(mobile, "PHOENX" , otp, function (error, data, res1) {
    //     console.log(res1.type + " \n" + data + " \n" + error);
    //     if(data.type === "success") {
    //         return res.json({
    //             status : 200
    //         });
    //     }else {
    //         return res.json({
    //             status : 400
    //         });
    //     }
    // });
});



module.exports = router;