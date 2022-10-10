import React, { useState } from 'react'

type MfaInputProps = {
    props: any
}

const MFA_LENGTH = 6;

const MfaInput: React.FC<MfaInputProps> = ({}) => {
    const [mfa, setMfa] = useState<number[]>()
    const [mfaValid, setMfaValid] = useState<boolean>(false);
    const [mfaSubmitted, setMfaSubmitted] = useState<boolean>(false);

    const handleMfaInput = (event: HTMLInputElement) => {
        try {

        } 
        
        catch(e: any) {

        }
    }

  return (
    <>

    </>
  )
}

export default MfaInput