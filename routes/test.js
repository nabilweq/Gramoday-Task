const router = require("express").Router();
const Report = require("../models/Report");

//find a report by id for testing the correctness of report
router.get("/", async (req, res) => {

    try {

        const test = await Report.findById(req.query.reportID);
        const count = test.users.length;

        //calculate the mean average
        var sum =0;
        for(var i =0; i < test.prices.length; i++) {
            sum+= test.prices[i];
        }
        var mean = sum/test.prices.length;
        
        const testDetails = {
            "createdAt": test.createdAt,
            "data": {
                "users": test.users,
                "pricesAdded": test. prices
            },
            "priceSum": sum,
            "numOfSubmission": count,
            "finalPrice": mean,
            "lastSubmission": test.updatedAt,
            "description": `${count} users submitted the report and the system converted the actual value to a base value based on the conversion value given by them`
        }

        res.status(200).json(testDetails);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
    
});

module.exports = router;