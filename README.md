# Product Store Application

## Overview

The **Product Store** application is a fully functional e-commerce platform that allows users to browse and search products by category. Built using **React** and **Redux**, this project leverages the [DummyJSON API](https://dummyjson.com/docs) for data fetching, ensuring efficient state management and a seamless user experience. You can access the live application [here](https://product-store-task.vercel.app/?category=&search=).

## Key Features

- **Category Selection:** Users can select a category to filter products or view all products when no category is selected.
- **Product Pagination:** Implements batch fetching of products in increments of 10, optimizing performance and reducing initial load times.
- **Search Functionality:** Allows users to search for products dynamically, with the search term stored in Redux for consistency across components.
- **Responsive Design:** The application is designed for a smooth and intuitive user experience, enhancing usability.

## Technical Implementation

- **Functional Components:** The application is built using React functional components, promoting reusability and simplicity.
- **Redux for State Management:** Redux is utilized to manage the global state for products, categories, and search input, ensuring a centralized and efficient state management solution.
- **Query Parameters:** Selected category and search terms are stored as query parameters, facilitating easy tracking and navigation.

## Limitations

- The application currently fetches products in batches but does not implement UI pagination, which may limit user navigation through large product sets.
- Error handling for API requests is basic and can be improved for better user feedback.

## Live Demo

You can explore the live application at the following link: [Product Store Application](https://product-store-task.vercel.app/?category=&search=).
