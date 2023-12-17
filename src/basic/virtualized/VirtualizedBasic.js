import * as React from 'react'
import { Virtuoso } from 'react-virtuoso'

const VirtualizedBasic = () => (
  <Virtuoso
    style={{ height: '300px',
    background: '#f8f8f8'
   }}
    totalCount={99999}
    itemContent={index => (
      <div style={{ 
        background: index % 2 === 0 ? '#ffbb00' : '#ffcc33',
        color: '#333',
        padding: '10px',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #ccc',
        borderRadius: '4px',
        margin: '5px 0'
      }}>
        Item {index}
      </div>
    )}
  />
)

export default VirtualizedBasic;
