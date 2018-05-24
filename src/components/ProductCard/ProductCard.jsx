import React from 'react'
import { Card, Label } from 'semantic-ui-react'

const ProductCard = ({ item, handleClick }) => (
  <Card fluid key={item.id} onClick={handleClick}>
    <Label attached="bottom left" icon="move" />
    <Label corner="right" icon="plus" />
    <Card.Content>
      <Card.Header content={item.name} />
      <Card.Meta content={item.company.name} />
    </Card.Content>
  </Card>
)

export default ProductCard
