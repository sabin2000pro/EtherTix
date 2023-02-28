import React from 'react'

interface IMintNFTProps {
    mintNFT: () => Promise<any>
}

export const MintToken = ({mintNFT}: IMintNFTProps) => {

  return (

    <div>
        <button onClick = {mintNFT}>Mint Token</button>
    </div>


  )
}

export default MintToken