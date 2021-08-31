const router = require("express").Router();
const Report = require("../models/Report");

//create a report and give response
router.post("/", async (req, res) => {

    let report = req.body.reportDetails;

    //generate today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    try {

        const currentReport = await Report.findOne({marketID: report.marketID, cmdtyID: report.cmdtyID, createdAt: today});
        const basePrice = report.price / report.convFctr;

        if(currentReport) {          
            if(currentReport.users.find(key => key == report.userID)) {
                 res.status(401).json({ "status": "error", "message":"User aleardy submitted today's report on specific commodity" });
            } else {
                //update the report by adding new user's data 
                await currentReport.updateOne({ $push:{ users: report.userID, prices: basePrice } });

                res.status(200).json({ "status": "success", "reportID":currentReport._id });
            }
        } else {
            const newReport = new Report({
                cmdtyName:report.cmdtyName,
                cmdtyID:report.cmdtyID,
                marketID:report.marketID,
                marketName:report.marketName,
                users:report.userID,
                prices:basePrice,
                createdAt:today
            });

            //save new report
            const savedReport = await newReport.save();
            return res.status(200).json({ "status": "success", "reportID":savedReport._id });
        }
    } catch (err) {
        res.status(500).json({ "status": "error", "message": err.message });
    }
    
});

//find a report by id, and send back with mean price.
router.get("/", async (req, res) => {

    try {
        const report = await Report.findById(req.query.reportID).select("-__v",);
 
        //calculate the mean price
        var sum =0;
        for(var i =0; i < report.prices.length; i++) {
            sum+= report.prices[i];
        }
        var mean = sum/report.prices.length;

        const newReport = {
            "_id": report._id,
            "cmdtyName": report.cmdtyName,
            "cmdtyID": report.cmdtyID,
            "marketID": report.marketID,
            "marketName": report.marketName,
            "users": report.users,
            "timestamp": report.createdAt,
            "priceUnit": report.priceUnit,
            "price": mean.toFixed(2)
        }
        res.status(200).json(newReport);
    } catch (err) {
        res.status(404).json({"error":"Invalid report id/report not found"});
    }
});

module.exports = router;