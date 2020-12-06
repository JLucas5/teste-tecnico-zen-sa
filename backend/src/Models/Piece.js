const mongoose = require("mongoose")

const PieceSchema = new mongoose.Schema({
    name: String,
    applicationVehicle: String,
    liquidWeight: String,
    grossWeight: String,
})

module.exports = mongoose.model("Piece", PieceSchema)