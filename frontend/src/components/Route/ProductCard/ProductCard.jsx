import React from 'react'

const ProductCard = ({ data, key }) => {
  return (
    <div key={key}>{data}</div>
  )
}

export default ProductCard