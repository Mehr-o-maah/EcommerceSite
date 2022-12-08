# File navigation guide for redux understanding

- src/redux/user.reducer.jsx Estan las funciones a exportar que podemos llamar en otros archivos para modificar o tener acceso a la store, usamos useSelector para esto

- src/redux/store.jsx es donde exportamos la store.

- src/components/sign-in-form/Sign-in-form.component.jsx se puede ver el setCurrentUser y useDispatch para acceder a la store y modificarla.

Pasar a redux:

- Checkout.component.jsx
- Product-card.component.jsx
- checkout.component.jsx

product-card.component.jsx  
 category-preview.component.jsx
category.component.jsx

cart-dropdown.component.jsx ->Fix this next to display dropdown
cart-item.component.jsx
