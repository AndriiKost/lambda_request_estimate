const mongoose = require('mongoose');

// User Schema
const EstimateSchema = mongoose.Schema({
    name: {
        type: String, 
    },
    email: { 
        type: String,
        required: true
    },
    projectCost: {
        type: String,
        required: true
    },
    projectDuration: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Estimate', EstimateSchema);