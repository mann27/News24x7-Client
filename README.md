# NewsClientSEN3
front-end

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

Node.js should be installed [https://nodejs.org/en/](https://nodejs.org/en/) <br />

## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

# File structure
<pre>
├─ .circleci
│  └─ config.yml
├─ .vscode
│  └─ settings.json
├─ public
│  ├─ .env
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ src
│  ├─ components
│  │  ├─ AboutPage
│  │  │  ├─ about-us.css
│  │  │  └─ index.js
│  │  ├─ Footer
│  │  │  └─ index.js
│  │  ├─ HelloWorld
│  │  │  ├─ helloStyle.js
│  │  │  └─ index.js
│  │  ├─ HelpPage
│  │  │  ├─ Faqs
│  │  │  │  ├─ faq.png
│  │  │  │  └─ index.js
│  │  │  ├─ Support
│  │  │  │  └─ index.js
│  │  │  ├─ help.css
│  │  │  └─ index.js
│  │  ├─ HomePage
│  │  │  ├─ Comment
│  │  │  │  ├─ commentStyle.css
│  │  │  │  └─ index.js
│  │  │  ├─ CreatePost
│  │  │  │  ├─ TextAreaFieldGroup.js
│  │  │  │  ├─ TextFieldGroup.js
│  │  │  │  ├─ createPostStyle.css
│  │  │  │  └─ index.js
│  │  │  ├─ Post
│  │  │  │  ├─ PostDetails
│  │  │  │  │  ├─ index.js
│  │  │  │  │  └─ postDetailsStyle.css
│  │  │  │  ├─ LikeButton.js
│  │  │  │  ├─ ReportButton.js
│  │  │  │  ├─ index.js
│  │  │  │  └─ postStyle.css
│  │  │  ├─ UserDetails
│  │  │  │  ├─ index.js
│  │  │  │  └─ userstyle.css
│  │  │  ├─ homeStyle.css
│  │  │  └─ index.js
│  │  ├─ LoginPage
│  │  │  └─ index.js
│  │  ├─ Navbar
│  │  │  ├─ index.js
│  │  │  ├─ logo.png
│  │  │  └─ nav.css
│  │  ├─ SignupPage
│  │  │  ├─ getValidationSchema-yup.js
│  │  │  ├─ index.js
│  │  │  ├─ signup.css
│  │  │  └─ validate-yup.js
│  │  └─ UserPage
│  │     ├─ index.js
│  │     └─ user.css
│  ├─ redux
│  │  ├─ actions
│  │  │  ├─ dataActions.js
│  │  │  └─ userActions.js
│  │  ├─ reducers
│  │  │  ├─ dataReducer.js
│  │  │  ├─ uiReducer.js
│  │  │  └─ userReducer.js
│  │  ├─ store.js
│  │  └─ types.js
│  ├─ routes
│  │  ├─ HelpRoutes.js
│  │  └─ authRoute.js
│  ├─ utils
│  │  ├─ images
│  │  │  └─ ad.png
│  │  ├─ MyButton.js
│  │  ├─ PostSkleton.js
│  │  ├─ UserDetailsSkleton.js
│  │  ├─ base-module.js
│  │  └─ black_spinner.gif
│  ├─ App.css
│  ├─ App.js
│  ├─ App.test.js
│  ├─ firebase.js
│  ├─ index.js
│  ├─ serviceWorker.js
│  └─ setupTests.js
├─ .gitignore
├─ README.md
├─ package-lock.json
└─ package.json

</pre>
