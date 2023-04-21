import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useContext } from 'react'

interface IMintNFTProps {
    mintNFT: () => Promise<any>
}

const MintToken = ({mintNFT}: IMintNFTProps) => {
  const dispatch = useDispatch();
  const {nfts, loading, error} = useSelector((state: any) => state.nfts);

  const handleNftMint = async (event: any) => {
    try {
        event.preventDefault();
    } 
    
    catch(error) {

      if(error) {
        return console.error(error);
      }

    }


  }

  return (

    <>

      <form className = "mint-form" method = "POST" onSubmit = {handleNftMint}>

          <div className = "mint-token-container">
              <button onClick = {mintNFT}>Mint Token</button>
          </div>

      </form> 
  
  
    </>


  )
}

export default MintToken