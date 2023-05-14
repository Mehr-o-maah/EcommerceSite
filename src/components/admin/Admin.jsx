import React, { useState } from "react";
import useSWR from "swr";

const baseUrl = "http://localhost:5000/categories";

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const performPutRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

const performPostRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await response.json();
  return data;
};

const performDeleteRequest = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const Admin = () => {
  const {
    data: categories,
    error: categoriesError,
    mutate,
  } = useSWR(baseUrl, fetchData);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductImageUrl, setNewProductImageUrl] = useState("");

  if (categoriesError) {
    return <div>Error loading categories</div>;
  }

  if (!categories) {
    return <div>Loading categories...</div>;
  }

  const handleUpdateProduct = async (
    categoryTitle,
    productId,
    updatedFields
  ) => {
    const category = categories.find(
      (category) => category.title === categoryTitle
    );

    const updatedItems = category.items.map((item) => {
      if (item.id === productId) {
        return { ...item, ...updatedFields };
      } else {
        return item;
      }
    });

    const updatedCategory = {
      ...category,
      items: updatedItems,
    };

    const updatedCategories = categories.map((category) =>
      category.title === categoryTitle ? updatedCategory : category
    );

    mutate(updatedCategories, false);

    await performPutRequest(
      `${baseUrl}/${categoryTitle.toLowerCase()}/items/${productId}`,
      updatedFields
    );
  };

  const handleAddProduct = async (categoryTitle) => {
    const category = categories.find(
      (category) => category.title === categoryTitle
    );
    const newProduct = {
      id: Date.now(),
      name: newProductName,
      price: newProductPrice,
      imageUrl: newProductImageUrl,
    };
    const updatedCategory = {
      ...category,
      items: [...category.items, newProduct],
    };
    const updatedCategories = categories.map((category) =>
      category.title === categoryTitle ? updatedCategory : category
    );
    mutate(updatedCategories, false);

    await performPostRequest(
      `${baseUrl}/${categoryTitle.toLowerCase()}/items`,
      JSON.stringify(newProduct)
    );

    // Reset the form
    setNewProductName("");
    setNewProductPrice(0);
    setNewProductImageUrl("");
  };

  return (
    <div>
      <h1>Admin</h1>
      {categories.map((category) => (
        <div key={category.title}>
          <h2>{category.title}</h2>
          <ul>
            {category.items.map((item) => {
              const nameRef = React.createRef();
              const priceRef = React.createRef();
              const imageUrlRef = React.createRef();

              return (
                <li key={item.id}>
                  <input type="text" defaultValue={item.name} ref={nameRef} />
                  <input
                    type="number"
                    defaultValue={item.price}
                    ref={priceRef}
                  />
                  <input
                    type="text"
                    defaultValue={item.imageUrl}
                    ref={imageUrlRef}
                  />
                  <button
                    onClick={() =>
                      handleUpdateProduct(category.title, item.id, {
                        name: nameRef.current.value,
                        price: priceRef.current.value,
                        imageUrl: imageUrlRef.current.value,
                      })
                    }
                  >
                    Send
                  </button>
                </li>
              );
            })}
          </ul>
          <div>
            <h3>Add New Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              min="10"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProductImageUrl}
              onChange={(e) => setNewProductImageUrl(e.target.value)}
            />
            <button onClick={() => handleAddProduct(category.title)}>
              Add Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
