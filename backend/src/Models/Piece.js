const mongoose = require("mongoose")

const PieceSchema = new mongoose.Schema({
    name: String,
    applicationVehicle: String,
    liquidWeight: Number,
    grossWeight: Number,
})

module.exports = mongoose.model("Piece", PieceSchema)