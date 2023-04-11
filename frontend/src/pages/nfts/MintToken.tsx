import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useContext } from 'react'

interface IMintNFTProps {
    mintNFT: () => Promise<any>
}

const MintToken = ({mintNFT}: IMintNFTProps) => {
  const dispatch = useDispatch();
  const {} = useSelector((state: any) => state.nfts);

  return (

    <div>
        <button onClick = {mintNFT}>Mint Token</button>
    </div>


  )
}

export default MintToken