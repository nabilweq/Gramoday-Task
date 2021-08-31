const mongoose = require('mongoose');

const ReportShcema = new mongoose.Schema({

     cmdtyName: {
         type: String,
         required: true
     },
     cmdtyID: {
         type: String,
         required: true
     },
     marketID: {
        type: String,
        required: true
     },
     marketName: {
         type: String,
         required: true
     },
     users: [
        {
            type: String,
            default: []
        }        
     ],
     priceUnit: {
         type: String,
         default: "Kg"
     },
     prices: [
        {
            type: Number,
            required: true
        }
    ],
    createdAt: {
        type: String,
        required: true
    }   
    },
    {timestamps:true}
    );
    
    module.exports = mongoose.model("report", ReportShcema);