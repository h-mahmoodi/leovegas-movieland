![LeoVegas MovieLand Logo](https://raw.githubusercontent.com/h-mahmoodi/leovegas-movieland/working/public/docs/app-logo.png)

# LeoVegas MovieLand

This project is a comprehensive React-based client application developed by Hesam Mahmoodi. It was created as part of a coding assignment for the Software Engineer position at LeoVegas. The application utilizes a variety of modern front-end libraries and tools to deliver a seamless user experience. Below is a detailed breakdown of the project's features, technologies, and purpose.

![LeoVegas MovieLand Demo](https://raw.githubusercontent.com/h-mahmoodi/leovegas-movieland/working/public/docs/app-demo.jpg)

## Table of Contents

- [All About the Project](#all-about-the-project)
  - [Description](#description)
  - [Technologies](#technologies)
  - [App Features](#app-features)
    - [UI and Styles](#ui-and-design)
    - [My Approach and Features](#my-approach-and-features)
- [Code Review Task#1](#code-review-task1)
  - [Problems & Improvments](#problems)
- [How It Works](#how-it-works)
  - [Installation](#installation)
- [Resources](#resources)

## All About the Project

### Description

The application is designed to demonstrate proficiency in React and associated front-end technologies. It provides a clean, responsive user interface that showcases key skills relevant to the Software Engineer role.

- To exhibit a solid understanding of React and its ecosystem.
- To implement best practices in frontend development.
- To create a user-friendly and visually appealing interface.

### Technologies

The project leverages a modern tech stack to ensure high performance and scalability. Key technologies include:

#### Language

- **JavaScript + TypeScript**: For type safety in JavaScript.

#### Core Libraries

- **React (Create React App)**: For building the user interface components.
- **Redux Toolkit (RTK)**: For state management across the application.
- **React Router**: For handling client-side routing.

#### Styling

- **CSS3**: For basic styling.
- **SASS**: For enhanced styling capabilities and maintainable stylesheets.

#### Tooling

- **ESLint**: To maintain code quality and consistency.
- **Prettier**: This is for formatting code to ensure consistency.

### App Features

#### Overall

The user interface of LeoVegas MovieLand is designed with user experience in mind. Key UI features include:

- **Single Page App**: The application behaves like a mobile app without hard refreshes of pages.
- **Query Links**: Users can save and load links (for searches).
- **Local Storage**: Utilizes local storage to save user data such as starred movies.

#### UI and Design

The user interface of LeoVegas MovieLand is designed with user experience in mind. Key UI features include:

- **Responsive Design**: Responsive design for four different breakpoints.
- **Semantic HTML**: Uses meaningful HTML tags.
- **Theme Structure**: Uses 7-1 Sass architecture and variables to implement a theme system.
- **SASS Structure**: Uses BEM (Block Element Modifier) naming methodology for class names.

#### Color Palette and Pattern

![LeoVegas MovieLand Colors](https://raw.githubusercontent.com/h-mahmoodi/leovegas-movieland/working/public/docs/app-colors.jpg)

### My Approach and Features

- **For Styling**: I've used Pure CSS using SASS instead of Bootstrap in the project, I've added a layout for the project, and I've used flatIcon CDN instead of Bootstrap icons(To have nicer icons).
- **For Responsive Design** : I've added 4 different Breakpoints with using @mixin in scss.
- **For TypeSafety**: I've added Typescript to the project.
- **For State**: I've used Redux to avoid props drilling and added appSlice for handling modal state.
- **For Components**: I've added smaller components and Router components to have a cleaner and maintainable project.
- **For Pages**: I've added page components to handle the logic of each page inside them.
- **For Keeping User Data**: I've added LocalStorage to the project to keep the previous user activities.
- **For Search Movies**: I've added a Search page using useSearchparams to use the URL state and keep the searched data.
- **For Modal**: I've added a Modal component with using createPortal() and appSlice to load it in one place all the time.
- **For Normalizing the Movies** : I've added two different types IMovie(incoming data from API) and IMovieSummary(normalized data).
- **For InfiniteScroll**: I've added a useInfiniteScroll hook with using IntersectionObserve and useRef to handle it.

## Code Review Task#1

### Problems

#### For the entire project

- **Nice to Have**: Add .env file for the project.
- **Nice to Have**: It's better to have a Router.jsx to handle all the routes (using Layout.jsx and <Outlet />).
- **Nice to Have** : Avoid props drilling between components.
- **Nice to Have**: It's better to have smaller components instead of having a big component like App.jsx.
- **Nice to Have**: Instead of adding scss for each component it's better to add all of them in one place (7-1 Architecture)
- **Nice to Have**: Using flex-box and grid-layout instead of float-layouts
- **Nice to Have**: Using rem unit instead of px to have a better responsive design based on the browser's default font size
- **Nice to Have**: Using meaningful class names using BEM methodology (Block Element Modifier).
- **Notice**: After installing packages with (npm install), it shows us 8 vulnerabilities (2 moderate, 6 high). based on react documentation and Dan Abramov(creator of CRA) it's not a security problem and we can ignore it or We can use VITE instead.

#### File : index.html

- **Nice to Have** : At lines 12 => Add a fit meta description for project.

#### File : package.json

- **Problem**: Using the sass package instead of node-sass (based on react documentation)
- **Nice to Have** : Separate development and main dependencies (devDependencies & dependencies)

#### File : constants.js

- **Problem**: At lines 3 & 4 => Remove "/" before "?" to solve the 404 network error and start using query strings.
- **Problem** : Avoid exporting and passing API_KEY & ENDPOINT (security reason)
- **Nice to Have** : Move API_KEY & ENDPOINT to the env file.
- **Nice to Have** : A function to replace API_KEY & ENDPOINT to other constants (DRY).

#### File : App.jsx

- **Nice to Have** : At lines 16 & 17 => Using Object Destructuring

```javascript
const { movies } = useSelector((state) => state);
```

- **Problem** : At lines 27 => avoid using useless and empty function(closeCard).
- **Problem** : At lines 54 to 58 => setOpen(true) is always called.
- **Nice to Have** : At lines 87 => avoid using inline styles as posible as we can.
- **Nice to Have**: Move logics and functionalities to their own components like (routing in jsx ,searchMovies ,getMovie ,viewTrailer and ...) to have smaller app.js file.

#### File : Movie.jsx

- **Problem** : At line 6 => 'closeCard' prop is never used.
- **Nice to Have** : At lines 8 & 9 => Using Object Destructuring
- **Problem** : At line 15 to 20 => using e.stopPropagation() at first.
- **Problem** : At line 19 & 24=> Avoid touch the dom directly in react(you can use useRef hook or jsx condition rendering)
- **Nice to Have**: At lines 32 to 38 & 48 to 54 => Move the dispatch function to a handler function to have leaner jsx
- **Nice to Have**: Move starredMovies and watchLAterMovies logics from jsx to their own components or pages.
- **Notice**: The movie component is used just for showing a movie's details, we must not use unrelated complex logic inside it.

#### File : Movies.jsx

- **Nice to Have**: At lines 2 => instead of adding scss for each component we can add all of them in one file line App.js
- **Notice**: It's better to avoid props drilling like (viewTrailer, closeCard),we can use redux or contextApi instead

#### File : Header.jsx

- **Problem**: Avoid using onClick on Link Component
- **Problem**: We must have a debounce for typing in the input and fetch new data to decrease network requests
- **Nice to Have**: At lines 33 to 41 => it's better to avoid using input inside a Link component,we can use onClick handler on input to navigate instead

#### File : Starred.jsx

- **Nice to Have**: At lines 5 => instead of adding scss for each component we can add all of them in one file line App.js
- **Nice to Have** : At lines 9 & 10 => Using Object Destructuring.
- **Nice to Have**: At line 29 => Move dispatch function to a handler function to have leaner jsx.

#### File : WatchLater.jsx

- **Nice to Have**: At lines 5 => instead of adding scss for each component we can add all of them in one file line App.js
- **Nice to Have** : At lines 9 & 10 => Using Object Destructuring.
- **Nice to Have**: At line 29 => Move dispatch function to a handler function to have leaner jsx.

#### File : moviesSlice.js

- **Nice to Have**: At lines 5 => Normalizing the data in fetcher to pass the data that we need,not all the data about each movie.

```javascript
{
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
        vote_average: movie.vote_average,
}
```

- **Nice to Have**: At lines 27 => Export reducer and actions separately instead of exporting all the slices with one export.

#### File : starredSlice.js

- **Nice to Have**: At lines 22 => Export reducer and actions separately instead of exporting all the slices with one export.

#### File : watchLaterSlice.js

- **Nice to Have**: At lines 22 => Export reducer and actions separately instead of exporting all the slices with one export.

#### Folder Structure and Tests :

![LeoVegas MovieLand Logo](https://raw.githubusercontent.com/h-mahmoodi/leovegas-movieland/working/public/docs/app-test.jpg)

## How It Works

I've created two branches in the project repository.

**_main_**: initial project without any changes.

**_working_**: My final project with all the commits (connected to the Netlify CD )

### Installation

To set up the project locally, follow these steps:

**Clone the repository**:

```bash
git clone https://github.com/h-mahmoodi/leovegas-movieland.git
```

**Navigate to the project directory**:

```bash
cd leovegas-movieland
```

**Install dependencies**:

```bash
npm install
```

**Start the development server:**:

```bash
npm run start
```

### Resources

**Live Demo on Netlify**: https://leovegas-movieland.netlify.app/

**Github** : https://github.com/h-mahmoodi/leovegas-movieland
