import React from 'react';
import { Spinner } from 'react-bootstrap';


const OverlaySpinner=({isLoading}:{isLoading: boolean})=>{

	if(isLoading){
		return(
			<div style={{
				backgroundColor:'rgba(255,255,255,0.98)',
				width:'100%',
				height:'100%',
				position:'fixed',
				zIndex:'10000',
				marginLeft: '-35px'
			}}>
				<div style={{
					position:'fixed',
					top:'45%',
					left:'50%',
					marginLeft:'-17px',
					zIndex:'10000'
				}}>
					<Spinner style={{color:"#00B0FF"}}  animation='border'>
					{' '}						
					</Spinner>	
		        </div>	
	        </div>	
		)
	}else{
		return null
	}
}

export default OverlaySpinner;