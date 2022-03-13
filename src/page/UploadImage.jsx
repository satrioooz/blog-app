import React from 'react'

const UploadImage = ({label, ...rest}) => {
  return (
    <div className='input-wrapper'>
            <p>{label}</p>
            <input type="file" {...rest} />
    </div>
  )
}

export default UploadImage