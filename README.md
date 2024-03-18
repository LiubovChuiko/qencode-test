# Front-End Test: Login Interface
Front-End Test: Login Interface

## Demo link:
Access at [netlify.com](https://qencode-test-login.netlify.app/)

## Table of Content:

- [About The App](#about-the-app)
- [Used 3-d party](#technologies)
- [Setup](#setup)
- [Approach](#approach)
- [License](#license)

## About The App
Login Interface - created integrated version of the Qencode Login UI using React, based on the design from
[Figma] and the Authentication API specification provided with task description.


## Used 3-d party
- Styling: `sass`
- Navigation: `react-router-dom`
- AccessToken Storage: `react-cookie`
- Inner Notifications (Error Handling): `react-toastify`

## Setup
- download or clone the repository
- in the root create .env and set up API Endpoint path as REACT_APP_API_URL

```bash

REACT_APP_API_URL=API_Endpoint

```

- run `npm install` & `npm start`
- visit `localhost:3000`

## Approach
Link to "Forgot your password?" flow will be shown after third failure of login process

For successfull API response simulation use:

```bash

email: admin@goooogle.com
password: 2244&Admin88

```

## License

MIT license @ [Liubov Chuiko](https://www.linkedin.com/in/liubov-chuiko/)