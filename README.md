# Movies Unlimited 
  
   [![Netlify Status](https://api.netlify.com/api/v1/badges/9c66e920-e237-40bc-84b0-e0502edf30a6/deploy-status)](https://app.netlify.com/sites/movies-unlimited/deploys)

   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) ![HeadlessUI](https://img.shields.io/badge/Headless%20UI-66E3FF.svg?style=for-the-badge&logo=Headless-UI&logoColor=black)
  
  ## Description  ✏️
  
  A place to track and watch upcoming and favorite movie & tv shows.

  This appication is in-progress. This is the client side. 

  ### Interesting Problems Solved During Building

  **Problem:** On page load, for the main page slide show, it is necessary to make 21 api calls due to the information required and the way the TMDB api is set up. This brings me to my first interesting problem with this application. I don't want any performance issues due to this amount of calls.  

  **Solution:** After weighing pros & cons of various approaches, and keeping React Query's power at the forefront of my thinking, I am making only 3 api calls on page load - the 20 movies, and the title logos for only two movies (the title logos require a separate hit by movie id to an images endpoint, this is where 20 extra fetches come into play). Then, as the slideshow goes on, or as the user hits the next button, I am prefetching the next logo that will be needed while filling up the React Query cache and then relying on the cache from that point forward. 
  Initial load  850-1000ms  
  New load time = 400-560ms  Roughly 50% improvement. 

  **Problem:** The addition of three sliding movie components below the slide increased loading time for three additional api calls. 

  **Solution:** Created a fetch on demand only when the user scrolls down, as caught by the react intersection observer. This prevents any fetching if the user never scrolls down, and fetches when the slider component is at a threshold of 0.1. 

  ## Table of Contents 📖
  
  [Installation](#installation)

  [Usage](#usage)

  

  [Issues](#known-issues)

  [Contributing](#how-to-contribute)

  [Tests](#tests) 

  [Credits](#credits)

  [Questions](#questions)
  
  ## Installation 
  
  To install necessary dependencies, run the following command:
  
  ```
  npm i
  ```
  
  ## Usage 
  
  Clone the repository, run the install command and then 'npm run dev'. Then navigate to the localhost port, 3003.

  You can also build with 'npm run build' and then run in production mode with 'npm run preview'

  You will need a TMDB api key in an env.

  ### Deployed Link
  Temporary deploy link: https://movies-unlimited.netlify.app/  

### Screenshots
![movies-unlimited](src/assets/images/movies-unlimited.png)



______________________________________________________________________________________



## Known Issues 
TBD

## How To Contribute 
  
Fork the repository and make a pull request with your new code.
  
## Tests 
  
To run tests, run the following command:
  


## Credits 
TMDB API

 ## Questions 
  
 If you have any questions about the repo or notice any bugs you want to report, open an issue or contact me directly at megan.meyers.388@gmail.com. 
  
  