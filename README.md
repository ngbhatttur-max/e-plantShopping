Setting up your environment in GitHub
Fork the repository
You need to fork the GitHub repository for your React application. The GitHub repository with the skeleton code for this project is here.Please use the same repository name when creating your fork:

https://github.com/ibm-developer-skills-network/e-plantShopping.git

After following the link above, click on the fork button.

fork the repository

This repository contains the basic layout of the React application for this project.

You will use this forked repository to push your latest code to keep a record of the work you do. Periodically save all your files. Your files must be saved to perform git commands.

Perform git add, git commit, and git push commands to update changes from your application folder to your GitHub repository for proper code management.

As part of the peer review project (if you choose this option) , you will need to deploy your app so your peers can review the UI. You can review these instructions for assistance with GitHub and for deployment instructions of react application.

If you've logged out and want to resume work on the project, clone the forked repository where you previously pushed the code. After cloning, you can use git push origin without the need to execute git remote add... to push your changes directly.
Create your React project
If you do not have an open terminal, select the "Terminal" tab at the top-right of the window, and then select "New Terminal". The screenshot below shows you where to locate these options on your screen.

SN screenshot

Now clone the forked repository using given command by replacing <forked-repo-link> with your own repository link.

javascript

git clone <forked-repo-link>
Note: You should keep the original repository name e-plantShopping

Make sure your application name matches your project.
After cloning the repository you will see the folder structure like given screenshot.

FP ss.png

Write the command to enter the application folder in the terminal. The command will set your terminal path to run the React application in the <forked-folder-name> folder.

bash

cd e-plantShopping
Run
To make sure that the code you have cloned is working correctly, you need to follow the given steps:

Write the following command in the terminal and select Enter to install all the necessary packages to execute the application.

bash

npm install
Run
Then execute the following command to run the application, providing you with port number 4173.

bash

npm run preview
Run
To view your React application, click the Skills Network icon on the left panel (refer to number 1). This action will open the Skills Network Toolbox. Next, click Launch Application (refer to number 2). Enter port number 4173 in Application Port (refer to number 3) and clickarrow pointing outside of a box.

Launch Your Application

The output will be according to given screenshot with background picture.



Now click on Get Started button and then you will see the given layout according to screenshot which includes navbar with green background color.

The navbar contains three links:

Paradise Nursey- This will take you back to the landing page of the application.
Plants- This will navigate you to the page where information related to page will be visible.
Cart icon- This will navigate you to the cart items section.
When you will click on cart icon output will be visible as per given screenshot.



Complete the required tasks explained on the pages that follow. You will assessed based on these tasks.

Updating the Readme.md file
Open your README.md file in your GitHub repository.

Includes the repository name e-plantShopping in the contents of the file.You can also mention the project name and provides a brief overview of your application

Note : Make sure the file includes the repository name e-plantShopping in the contents.

Make sure that you save these changes by pushing your code to your GitHub repository.

Note : This step can be skipped if you choose to proceed with the Peer Graded Assignment.


Task 1: ProductList component Layout
The product page will allow your users to shop for the different plants you sell. Each plant will display on its own "card" with its related data stored in the plant object. You will store the plant objects in an array. Follow these steps for the array and plant objects.

Display the Plant Array
Navigate to the ProductList.jsx component and you will see an array named plantsArray with the plants details.
Each plant object contains the categories, properties name, image URL, description, and cost.
Display Plant Details within div tag with class name product-grid.
Utilize array methods to map over the plant array.

Hint: use the map() method to iterate array.

Render each plant's details on the page, including name, image, description, and cost.

Display an Add to Cart button for each plant.
javascript

{plantsArray.map((category, index) => ( // Loop through each category in plantsArray
  <div key={index}> {/* Unique key for each category div */}
    <h1>
      <div>{category.category}</div> {/* Display the category name */}
    </h1>
    <div className="product-list"> {/* Container for the list of plant cards */}
      {category.plants.map((plant, plantIndex) => ( // Loop through each plant in the current category
        <div className="product-card" key={plantIndex}> {/* Unique key for each plant card */}
          <img 
            className="product-image" 
            src={plant.image} // Display the plant image
            alt={plant.name} // Alt text for accessibility
          />
          <div className="product-title">{plant.name}</div> {/* Display plant name */}
          {/* Display other plant details like description and cost */}
          <div className="product-description">{plant.description}</div> {/* Display plant description */}
          <div className="product-cost">${plant.cost}</div> {/* Display plant cost */}
          <button
            className="product-button"
            onClick={() => handleAddToCart(plant)} // Handle adding plant to cart
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
))}
Include above code within class name product-grid.
Create one variable named addedToCart for state management using the useState hook to track which products are added to the cart.
js

const [addedToCart, setAddedToCart] = useState({});
Add to Cart Functionality
Create the handleAddToCart function to implement the functionality for adding a plant to the cart when the user selects the Add to Cart button. This function should take one parameter that contains the information of the selected plant. This information should then be dispatched to the addItem inside the function component CartSlice.

Additionally, reflect the product has been added to the cart. Update the setAddedToCart state to by setting the product name as a key and its value to true.

js

const handleAddToCart = (product) => {
  dispatch(addItem(product)); // Dispatch the action to add the product to the cart (Redux action)

  setAddedToCart((prevState) => ({ // Update the local state to reflect that the product has been added
    ...prevState, // Spread the previous state to retain existing entries
    [product.name]: true, // Set the current product's name as a key with value 'true' to mark it as added
  }));
};
Note: Make sure that you import the addItem reducer from CartSlice.jsx

The handleAddToCart() function will carry the details of that plant which user want to add in the cart. And the plant details to the cart at a global level using CartSlice.jsx.

Make sure that you save these changes by pushing your code to your GitHub repository.


Task 2: State management using Redux
You have the basic layout in the CartSlice.jsx file.

Define Reducer Functions

Now implement the reducer property of the slice for adding, removing, and updating the number of items in the cart.

These reducer functions will be called when user wants to add or remove the quantity of plants within the cartItems component.

The addItem() reducer adds a new plant item to the items array which you initialized in the previous step.

The addItem() function should get called when the user selects an Add to cart on the plant listing page. Subsequently, the handleAddToCart() gets called which has the plant type as a parameter.

The handleAddToCart() function will then dispatch the plant details to the addItem() reducer function in CartSlice.jsx.

js

addItem: (state, action) => {
  const { name, image, cost } = action.payload; // Destructure product details from the action payload
  // Check if the item already exists in the cart by comparing names
  const existingItem = state.items.find(item => item.name === name);
  if (existingItem) {
    // If item already exists in the cart, increase its quantity
    existingItem.quantity++;
  } else {
    // If item does not exist, add it to the cart with quantity 1
    state.items.push({ name, image, cost, quantity: 1 });
  }
},
Now you need to complete code for the removeItem() and updateQuantity() reducers.

removeItem(): This reducer removes an item from the cart based on its name and gets called when the user wants to remove products from the cart.

js

state.items = state.items.filter(item => item.name !== action.payload);
updateQuantity(): To create this function, start by extracting the item's name and amount from the action.payload. Then, look for the item in the state.items array that matches the extracted name. If the item is found, update its quantity to the new amount provided in the payload. This ensures the item's quantity is correctly updated based on the action.
javascript

const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
// Find the item in the cart that matches the given name
const itemToUpdate = state.items.find(item => item.name === name);
if (itemToUpdate) {
  itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
}
Handle Actions
Export the action creators, addItem() to use in ProductList.jsx, removeItem(), and updateQuantity(), to use in the CartItem.jsx.
Also export the reducer as the default to use in store.js.
Make sure you save these changes by pushing your code to your GitHub repository.


Task 3: CartItems component
Next, you will complete the development of the CartItem.jsxcomponent which displays the items held in the shopping cart. This component has a number of functionalities that you find in a typical shopping cart:

Calculate the total for all items in the cart.
Calculate the subtotal for each plant type in the cart.
Continue shopping
Increment and decrement the number of each plant type in the cart
Remove (delete) a plant type from the cart altogether.
You will dispatch the increment, decrement, and update quantity details from a Redux file.

When you are done, the cart page should look similar to the following:

Cost of all items in cart
In the calculateTotalAmount() you need a function to calculate the cost of all of the items in the cart. There are a number of ways you can calculate this.
Initialize a variable total to hold the cumulative sum.
Iterate over the cart array using cart.forEach().
For each item, extract its quantity and cost.
Convert the cost string (e.g., "$10.00") to a number using parseFloat(item.cost.substring(1)), then multiply it by the quantity.
Add the resulting value to total.
After processing all items, return the final total sum.
Continue shopping
Users should be able to return to the plant listing page to continue shopping while on the shopping cart page. So, in the handleContinueShopping() function, call the onContinueShopping(e) function passed from the parent component.
Checkout
In this project, you are not required to provide the handleCheckoutShopping() function, but you may wish to for further exploration and practice. For now, just add in the following code to alert the user this function will get added at a later date.
js

const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};
Increment and decrement
For the handleIncrement() and handleDecrement() functions, you need to dispatch the updateQuantity() reducer in the CartSlice.jsx file. In the function argument, either add one to the item.quantity value or subtract one, respectively.

Also, for the handleDecrement() you will need an if-else to handle the case. -- If the item's quantity is greater than 1, dispatch updateQuantity to decrease the quantity by 1. -- Else if the quantity would drop to 0, dispatch the removeItem action to remove the plant type from the cart.

Dispatch the updateQuantity action (from your Redux slice) to increase or decrease the item's quantity by 1.
Use the name parameter of the item to identify which item's quantity needs to be updated.
Example code:
plaintext

dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
Remove plant from the cart
For the handleRemove() function you need to dispatch the removeItem action to delete the item from the cart.
Item subtotal
Calculate the total cost for an item by multiplying its quantity with its unit price in the calculateTotalCost() function.
Extract the numeric value from the item's cost string using parseFloat(item.cost.substring(1)) before performing the multiplication.
Note: Ensure that these event handlers update the UI in real time. When the user changes the number of a plant type, the following should update accordingly: • The individual plant quantity. • The item's subtotal. • The overall total cost. • The the total number of items in the cart icon. • After a user clicks the "Add to Cart" button for a plant item, the button should become disabled and grayed out, and its label should update to "Added to Cart" to indicate that the item has already been added.



Make sure that you save these changes by pushing your code to your GitHub repository.


Task 4: Integrate Redux functionality in your components
ProductList Component
Initialize the cart state within the Redux store to keep track of cart items.
dispatch(addItem(product));

Use the addItem action to add selected products to the cart.
Access the Redux store to retrieve and display the total quantity of items currently in the cart.
const calculateTotalQuantity = () => { return CartItems ? CartItems.reduce((total, item) => total + item.quantity, 0) : 0; };

CartItem Component
Use the updateQuantity action to change how many items are in the cart.
Use the addItem action to add a new product to the cart.
Use the removeItem action to delete an item completely from the cart.
dispatch(removeItem(item.name));

Note: Make sure that you save these changes by pushing your code to your GitHub repository


Task 5: Import details to store.js
Importing Necessary Functions and Files:

The configureStore() function from the @reduxjs/toolkit package is imported to set up the Redux store.
The cartReducer from the CartSlice.jsx file which is imported, manages the state slice related to the shopping cart.
js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
Configuring the Store:

The configureStore() function is used to setup the Redux store.
Inside the configuration object passed to configureStore(), the reducer key specifies the reducer functions. In this case, the cartReducer is assigned to manage the cart slice of the state.
js

// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
    // Define the root reducer object
    reducer: {
        // 'cart' is the name of the slice in the store, and it's managed by cartReducer
        cart: cartReducer,
    },
});

export default store; // Export the store for use in the app (e.g., in <Provider store={store}>)
Exporting the Store:

The configured Redux store is exported using export default store;, so it can be used throughout the application to manage state.
js

export default store;
Note: - This store.js code is pre-configured in the repository and ready for use. - Make sure that you save these changes by pushing your code to your GitHub repository



Task 6: Set up the global store
Navigate to the main.jsx file in the src folder.

The Provider component from the react-redux library is already imported. This component enables all components in the application to access the Redux store.

js

import { Provider } from 'react-redux';
The Redux store is imported from the store.js file. This store holds the application's state, using the reducer defined in the CartSlice.jsx file.
js

import store from './store.js';
The App component is wrapped with the Provider component, with the Redux store passed as a prop. This allows all components in the app to access and interact with the global state managed by Redux.
js

<Provider store={store}>
  <App />
</Provider>
Deploying Your Application with GitHub Pages
To deploy your react application in GitHub you need to install gh-pages. This allows you to use it as a tool for deploying your project to GitHub Pages. Perform given command in the terminal

javascript

npm install gh-pages --save-dev
Add given lines before "build": "vite build" in package.json file.

javascript

"predeploy": "npm run build",
"deploy": "gh-pages -d dist",


Then in the vite.config.js file add this line before plugins: [react()]

javascript

base: "/YOUR_REPOSITORY_NAME",


Note: Instead of write your own repository name such as assume if your github repository name is learning_react the it should look like base: "/learning_react"

Now perform deploy command in the terminal to executes the "deploy" script defined in the package.json file, deploying the project to GitHub Pages using the gh-pages tool.

javascript

npm run deploy


Note: Whenever you make any change to your code you need to save all your files and perform git commands for them.

Perform git add and git commit commands to update changes in your code. Then perform git push command to update your GitHub repository for proper code management.

Go to your GitHub repository. Then, navigate to your site's repository that you created.

Under your repository name, click Settings.



Navigate to the left hand side navigation bar. In the Code and Automation section of the sidebar, click Pages.

Settings tab with Pages circled

You will see the page shown below. Click the drop down menu where you see None, then click gh-pages, and then click the Save button.



Refresh your page again, and you will see the link, just as below. Instead of shoppingreact, you will see your github repository name.



Note: If you are not able to see the link, please wait for (1-2) minutes and refresh the page again.

Click above generated link to see your live website.

gh react.png

Note:

This code is pre-configured in the repository and ready for use.
Make sure that you save these changes by pushing your code to your GitHub repository
After deploying on GitHub Pages, it may take some time for all contents and images to appear properly. Please wait a few extra minutes for the application to load completely.


Project Completion
Congratulations!
You completed this project! Great work.

If you have not already done so, deploy your application. You can deploy it using GitHub Pages or your own hosting site.
Ensure you have pushed all the updated files to your github repository
Summary
You created function React components, composed, and nested them.

You implemented React Hooks, specifically the useState and useEffect hooks to manage component-level states.

You integrated Redux within your React application and applied Redux concepts like actions, reducers, and the store.

You dynamically rendered data fetched from an array of objects onto the UI. You mapped over arrays to generate lists of components.

You handled user events such as button selection and triggered corresponding actions to add and remove items in the cart.




Checklist for Option 2: Peer Review Evaluation
After completing the final project, you should:

Submit the URL of your deployed application, hosted on GitHub Pages or another platform.

Ensure your app is fully functional and publicly accessible.
Submit the GitHub URL of your public repository, named e-plantShopping.

Ensure all files are committed and pushed before submission.
Project Evaluation Rubric for peer review

GitHub Link:

Public GitHub repository URL
Redux-related files and code implemented correctly
By URL of your deployed application: Landing Page

Background image displayed properly
Includes a paragraph about the company
Displays the company name
Includes a "Get Started" button that links to the product listing page
Product Listing Page

Displays at least six unique houseplants for sale, each showing a thumbnail, name, and price
Groups plants into at least three categories
Includes an "Add to Cart" button for each plant that:
Adds the selected plant to the shopping cart
Increments the shopping cart icon count
Disables the button after the plant is added
Header

Displays on both the product listing and shopping cart pages
Includes a shopping cart icon that dynamically displays the total number of items
Allows navigation between the product listing and shopping cart pages
Shopping Cart Page

Displays the total number of plants in the cart

Displays the total cost of all items

Each plant type displays a thumbnail, name, and unit price

Includes buttons to increase or decrease the quantity of each plant and update totals accordingly - Includes a delete button to remove items from the cart

Includes a checkout button displaying "Coming Soon" or a similar message

Includes a "Continue Shopping" button linking back to the product listing page

Before You Submit

Confirm that your deployed application link opens correctly.

Ensure your GitHub repository is public and includes all the latest updates.

