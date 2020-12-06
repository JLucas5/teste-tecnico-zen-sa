import axios from "axios"

const api_url="http://localhost:3334"


const getPieces = async () =>{
    const response = await axios.get(api_url + '/pieces')
    return response
       
}

const deletePiece = async (piece_id) =>{
    const response = await axios.delete(api_url + '/piece/delete/' + piece_id)
    return response
        
}

const savePiece = async (piece) => {
    console.log(piece)
    const response = await axios.post(api_url + '/piece/new',{
        "name": piece.name,
        "applicationVehicle": piece.applicationVehicle,
        "grossWeight": piece.grossWeight,
        "liquidWeight": piece.liquidWeight
        } )
    return response
       
}

const api = {

    getPieces ,
    deletePiece,
    savePiece
}
export default api