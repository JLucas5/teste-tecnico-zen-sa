import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import Pieces from "./pages/Pieces/Pieces"

export default function Routes() {
	return (
			<BrowserRouter>
				<div>
					<Route exact path="/" component={Pieces} />
				</div>
			</BrowserRouter>
	)
}
