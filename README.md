# PDF Editor Web App :

##### Technologies Used : MERN(MongoDb,Express,React.js,Node.js),Bootstrap,Material UI

#### Dev Tools : VS Code,Github,Vercel,Render

#### Web App Development Approach :

##### Backend :
--User Signup and Login system has been implemented,by this user can create an account and login with it, jwt token authentication is used to verify user at every API call.

--And to store the User details Mongodb has been used as NoSQL Database.

--By using "pdf-lib: npm package,pages to be present are given as input inform of array,then it will process and remove unwanted pages from pdf and store it as temp file,provide the link 
  to download

--And we can also replace the original pdf with the new pdf created, in database of user account.

--The Backend is Built on Express framework with Node.js runtime.


##### Frontend :
--The frontend UI is built on React.js using Javascript as programming languagage.

--In react for routing, used package RouterDom,for notifications "React Toastify" has been used.

--After logging in,user can upload the pdf and select the required pages he wanted to export to a new pdf,then after he can export and download the new pdf 

--A notification pop up asks Do you want to replace,the old pdf with new one.

--Frontend app has been deployed in Vercel Hositng Website.

### Steps Required To Run Applications :

#### Frontend -React :

--"npx create-react-app ."
  For creating react app "node-modules".

--"npm install"
   For install all the depencies and packages in the "node-modules" folder.

--"npm start"
   Runs the app in the development mode.
   Open http://localhost:3000 to view it in your browser.

--"npm run build"
   Builds the app for production to the build folder. 
   It correctly bundles React in production mode and optimizes the build for the best performance.

#### Backend :

--"npm install"
     For install all the depencies and packages in the "node-modules" folder.

--"npm install --force"
    If any version conflicts use "--force" flag to  install all the depencies and packages in the "node-modules" folder.

--"node index.js"
   To start and run the server.  
   Open http://localhost:8081 to view it in your browser.

### Deployed Links :

#### --Backend : https://pdfeditor-backend.onrender.com

#### --Frontend : https://pdfeditor-mern.vercel.app/

### Attached The Postman API Documentations : Refer Github Repository

### Video Recording & Screenshots Of Website Overview : Googledrive Link :

