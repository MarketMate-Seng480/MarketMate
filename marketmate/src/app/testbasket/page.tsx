"use client";
import React, { useState } from 'react';

import CartItem from '../_components/BasketProduct';

export default function Page() {
  return (
    <CartItem
      imageUrl="https://picsum.photos/id/237/200/300"
      name="Puppy Collar"
      quantity={1}
      price={9.99}
      onQuantityChange={(newQuantity) => console.log(newQuantity)}
    />
    
  );
}
