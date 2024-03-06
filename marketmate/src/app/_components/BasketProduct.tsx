import React from 'react';

type ProductProps = {
  imageUrl: string;
  title: string;
  variant: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

const Product: React.FC<ProductProps> = ({ imageUrl, title, variant, price, originalPrice, quantity }) => {
  return (
    <div className="product">
      <div className="product-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="product-details">
        <h2>{title}</h2>
        <p>{variant}</p>
      </div>
      <div className="product-quantity">
        <select value={quantity} onChange={(e) => {/* Handle quantity change */}}>
          {/* Populate options based on available stock */}
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          {/* ... */}
        </select>
      </div>
      <div className="product-pricing">
        <span className="price">{`$${price.toFixed(2)}`}</span>
        <span className="original-price">{`$${originalPrice.toFixed(2)}`}</span>
      </div>
      <div className="product-total">
        <span>{`$${(price * quantity).toFixed(2)}`}</span>
      </div>
    </div>
  );
};

export default Product;