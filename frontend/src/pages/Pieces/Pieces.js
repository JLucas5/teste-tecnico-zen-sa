import React, { useEffect, useState } from 'react'
import api from "../../services/api"

import './Pieces.css'

import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

export default function Pieces({ history }){

    const [pieces, setPieces] = useState([])
    
    const [showNewModal, setShowNewModal] = useState(false)

    /**
     * New Piece properties variables
     */
    const [name, setName] = useState("")
    const [applicationVehicle, setApplicationVehicle] = useState("")
    const [grossWeight, setGrossWeight] = useState()
    const [liquidWeight, setLiquidWeight] = useState()

    const [loadingState, setLoadingState] = useState(false)

    /**
     * Sorting callback function
     */

    useEffect(()=> {
        async function loadPieces(){
            const response = await api.getPieces()

            setPieces(response.data)
        }

        loadPieces()
    }, [] )

    async function deletePiece(piece_id) {
		const newList = await api.deletePiece( piece_id )
            
        setPieces(newList.data)	
    }
    
    async function savePiece(){
        
        if(liquidWeight <= 0 || grossWeight <= 0){
            alert("Peso negativo!")
            return;
        }
        if(liquidWeight > grossWeight){
            alert("Peso líquido excede o peso bruto!")
            return;
        }
        setLoadingState(true)
        
        const response = await api.savePiece({
            "name": name,
            "applicationVehicle": applicationVehicle,
            "grossWeight": parseFloat(grossWeight).toFixed(2),
            "liquidWeight": parseFloat(liquidWeight).toFixed(2),
        })

        setPieces(response.data)

        setLoadingState(false)
        handleCloseNew()
    }

    const handleGrossBlur =(e) => {
        var num = parseFloat(grossWeight);
        var cleanNum = num.toFixed(2);
        setGrossWeight(cleanNum);
  }
  
    const handleCloseNew = () => setShowNewModal(false)
    const handleNewRecord = () => setShowNewModal(true)

    return (
        <>
            <button
				className="table-button new-button"
				onClick={() => {
					handleNewRecord()
				}}>
				Novo
			</button>
            <Table
                
				className="pieces-table"
				striped
				bordered
				hover
				variant="dark">
				<thead>
					<tr>
						<th >
                            <div>Nome</div>							
						</th>
                        <th >
							<div>Veículo de Aplicação</div>
						</th>
                        <th >
							<div>Peso Bruto</div>							
						</th>
                        <th >
							<div>Peso Líquido</div>							
						</th>
                        <th >
                            <div>Deletar</div>							
						</th>
					</tr>
				</thead>
				<tbody>
					{pieces?.map((piece) => (
						<tr key={piece._id}>
							<td >
								<div>
									{piece.name}
								</div>
							</td>
                            <td >
								<div>
									{piece.applicationVehicle? piece.applicationVehicle : "-----"}
								</div>
							</td>
                            <td >
								<div>
									{piece.grossWeight + " kg"}
								</div>
							</td>
                            <td >
								 <div>
                                    {piece.liquidWeight + " kg"}
                                </div>
							</td>
                            <td >
								<div>
                                    <button
										className="table-button"
										onClick={() => {
										    deletePiece(piece._id)
										}}>
										Excluir
									</button>
                                </div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

            {/** New Piece Modal */}
			<Modal className="modal" show={showNewModal} onHide={()=>{handleCloseNew()}}>
				<Modal.Header closeButton>
					<Modal.Title>Novo Registro</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                
                <div className='input-div'>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nome da peça"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        maxLength="200"
                        required
                        />
                    <label htmlFor="applicationVehicle">Veículo de Aplicação</label>
                    <input
                        type="text"
                        id="applicationVehicle"
                        placeholder="Veículo de Aplicação"
                        value={applicationVehicle}
                        onChange={(event) => setApplicationVehicle(event.target.value)}
                        maxLength="200"
                        />
                    <label htmlFor="grossWeight">Peso Bruto</label>
                    <input
                        type="number"
                        id="grossWeight"
                        placeholder="Peso bruto"
                        value={grossWeight}
                        onChange={(event) => setGrossWeight(event.target.value)}
                        onBlur={(event) => handleGrossBlur(event)}
                        required
                        />
                    <label htmlFor="liquidWeight">Peso Líquido</label>
                    <input
                        type="number"
                        id="liquidWeight"
                        placeholder="Peso líquido"
                        value={liquidWeight}
                        onChange={(event) => setLiquidWeight(event.target.value)}
                        required
                        />
                </div>

				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={()=>{handleCloseNew()}}>
						Fechar
					</Button>
					<Button
						variant="primary"
						onClick={(event) => {
							savePiece()
						}}
						disabled={loadingState ? true : false}>
						{loadingState ? "Salvando . . ." : "Salvar"}
					</Button>
				</Modal.Footer>
			</Modal>
        </>
    )
}