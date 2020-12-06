const Piece = require("../Models/Piece")

module.exports = {
    async store(req, res){
        console.log(req.body)
        const {name, applicationVehicle = "", liquidWeight, grossWeight} = req.body

        const piece = await Piece.create({
            name, applicationVehicle, liquidWeight, grossWeight
        })

        const pieceList = await Piece.find()
        const sortedList = pieceList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        return res.json(sortedList)
    },

    async show(req, res) {
        const pieceList = await Piece.find()
        const sortedList = pieceList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        return res.json(sortedList)
    },

    async delete(req, res) {
		const { piece_id } = req.params

        await Piece.findByIdAndDelete(piece_id)
        
        const pieceList = await Piece.find()
        const sortedList = pieceList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

		return res.json(sortedList)
    },
    
}