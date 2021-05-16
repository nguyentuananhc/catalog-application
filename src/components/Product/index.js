import { useState } from "react";
// import { boldString } from "helpers/boldString";

export default function Product({ productInfo = {} }) {
  const { name, imageUrl, price, brand } = productInfo;
  const [url, setsURL] = useState(imageUrl);

  const handleErrorImage = () => {
    setsURL(
      "http://i5.walmartimages.com/dfw/dce07b8c-e089/k2-_8ecfcc1e-2d5e-4258-aef1-1d38887374f9.v3.jpg"
    );
  };

  return (
    <div className="overflow-hidden bg-white rounded shadow-xl">
      <img
        onError={handleErrorImage}
        className="object-cover w-full"
        src={url}
        alt={brand}
      />
      <div className="px-6 py-4">
        {/* <div className="text-xl truncate"> */}
        <div
          className="text-md"
          dangerouslySetInnerHTML={{ __html: name }}
        ></div>
        {/* <div className="text-xl truncate">{productName || "Product Name"}</div> */}
        <p className="mt-2 text-gray-700">{`${price}$` || "Out of stocks"}</p>
      </div>
    </div>
  );
}
