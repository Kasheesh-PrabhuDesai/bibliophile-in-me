# IDEA BEHIND APP
Using the open library api the user is provided a search box to search for books or any other media only by using a suitable book title search query. 

# FRAMEWORKS AND LANGUAGE USED
React.js + Typescript + Material UI + Redux toolkit


# STRUCTURE OF THE CODEBASE
The app follows a modular structure which is as follows

1. /src/components - holds all the reusable components containing the business logic of fetching books and displaying the results
2. /src/pages -  holds the representational UI for the home page, search results page and the book details page
3. /src/tests - holds three jest tests each one testing one page of the app
4. /src/utils - holds the util files such as the type definitions and enums
5. /src/services - holds the api requests for fetching book details and fetching books by search query
6. /src/store - holds the redux store along with the dispatch action as thunks, store selectors and store reducers

# IMPORTANT DECISIONS TAKEN 
1. Redux toolkit is used which is a much better and easier implementation over the basic redux package. Async thunk is used to dispatch store actions. The store is designed to hold the loading and error state messages along with othe book search results which is then used on the frontend to display the loading or error state message.

2. Redux persist gate is used to persist the redux store values on page reload to improve user experience

3. The inbuilt fetch library is used to avoid use of third party package


# WEB APP
The code has been deployed on vercel and can be accessed following this link https://bibliophile-in-me.vercel.app

# HOW TO RUN THIS APP
1) git clone git@github.com:Kasheesh-PrabhuDesai/bibliophile-in-me.git
2) cd bibliophile-in-me
3) yarn 
4) yarn start or yarn test



