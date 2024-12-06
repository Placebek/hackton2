import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './components/main/Home'

function App() {
	return (
		<div className='flex flex-col min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#999999]'>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<Home />
						</>
					}
				/>
				<Route path='/profile' element={<></>} />
			</Routes>
		</div>
	)
}

export default App
