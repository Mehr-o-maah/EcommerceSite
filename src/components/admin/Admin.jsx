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

export const Admin = () => {
  const {
    data: categories,
    error: categoriesError,
    mutate,
  } = useSWR(baseUrl, fetchData);

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
        </div>
      ))}
    </div>
  );
};
