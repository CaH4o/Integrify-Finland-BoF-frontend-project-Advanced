# Name of the project: 
Front-end Project Advanced "E-commerce website".

## Link to the demo: 
[https://cah4o.github.io/bof-frontend-project-advanced/](https://cah4o.github.io/bof-frontend-project-advanced/) 

## Tech stack: 
- HTML;
- CSS;
- React with Redux, React Router, Material UI, Axios; 
- Typescript;
- REST API.

## Description:
The final front-end task under the BOF program. The goal - to create an e-commerce website using REST API for my skills assessment. All requirements from the Integrify academy are described below.
The site consists of several pages, showing all products, a specific selected product, a shopping cart for selected products, and a user profile. To move to addresses without reloading the page and to redirection it used a React Router (AppRouter.ts).
Reducers and the global storag were implemented to work with products and manipulate them. Products can be sorted, categorized, added to cart or liked. To store data when reloading the page, a subscription and pre-loading of data was implemented by working with the local store. Products are featched by axios, using the REST API. Also REST API is used for user registration and authorization. If the user is registered, he can get to the profile page. Workers for products, users and credential  were created to work with API and programm. Credential worker is responsible for authorizing the user and rights. For example, if you log in as an admin, you can view all users on the profile page or edit the product. There are two mods, dark and light, and the whole design and styles are fired up using Material UI.

## Requirement from the acadamy:
1. Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website. Read the documentation and learn how to use the different endpoints.
2. Create at lease 4 pages (can be more if you want): Home page, product page,
profile page (only available if user logins), and cart page (cart could be a page or a modal)
3. Use context API to create a button to switch themes of the web app
4. Create Redux store for following features:
    - product reducer: get all products, find a single products, sort products by
    categories, sort products by price, update and delete a product (enable update & delete features only for admin of the webapp. For example, you can check if user is your admin account before let them delete product)
    - user reducer: get all users, find a single user, create new user (delete user is not allowed in this api), authenticate user
    - cart reducer: add product to cart, remove products, update products's quantity in cart
5. When adding routers to your application, programatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.

## Instruction to start the project

In the project directory, you can run:
### `npm install` 
Install all the dependencies

### `npm start`  
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test` 
Launches the test runner in the interactive watch mode

### `npm run build` 
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
