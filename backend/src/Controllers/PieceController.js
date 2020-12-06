const Piece = require("../Models/Piece")

module.exports = {
    async store(req, res){

        const {name, applicationVehicle = "", liquidWeight, grossWeight} = req.body

        const piece = await Piece.create({
            name, applicationVehicle, liquidWeight, grossWeight
        })

        return res.json(piece)
    },

    async show(req, res) {
        const pieceList = await Piece.find()

        return res.json(pieceList)
    },

    async delete(req, res) {
		const { piece_id } = req.params

		await Piece.findByIdAndDelete(piece_id)

		return res.json({ warning: 'Piece deleted' })
    },
    
}