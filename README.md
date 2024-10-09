# Chatter

## Overview

This is a full-stack chat application built with privacy and security in mind. It offers a range of features:

- **Zero Knowledge Proof Authentication**: Secure login using Schnorr scheme and advanced cryptography.
- **End-to-End Encrypted Messaging**: Only the intended recipient can read the messages.
- **Dynamic Chat Windows**: Up to 4 resizable and draggable chat windows at a time.
- **Firebase Cloud Storage**: User profile media is stored and retrieved securely from Firebase.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js
- **Database**: MongoDB (with a collection named `login` for user data)
- **Cloud Storage**: Firebase Cloud Storage
- **Authentication**: Zero Knowledge Proof methods
- **Encryption**: End-to-End Encryption

## Setup Instructions

### Prerequisites

1. **MongoDB**: Ensure that MongoDB is installed on your machine. The database should have a collection named `login`.

2. **Node.js and npm**: Install Node.js and npm if you haven’t already.

### Clone the Repository

```
git clone https://github.com/Susmm/Chatter.git .
cd Chatter
```

### Backend Setup

    1. Navigate to the server directory:
    
```
cd server
```

	2. Install the dependencies:
	
```
npm install
```
	3. Start the server:

```
npm start
```

### Frontend Setup

	1. Open a new terminal window and navigate to the client directory:
	
```
cd client
```

	2. Install the React dependencies:
	
```
npm install
```

	3. Start the React development server:
	
```
npm start
```

The client will run at [http://localhost:3000](http://localhost:3000).


### MongoDB Setup

    1. Ensure MongoDB is running.
    2. Create the required database and collection:

```
use test
db.createCollection("login")
```

### Firebase Setup

Configure Firebase for user profile media storage by setting up your Firebase project and adding the configuration details to your project’s environment files.

### Deployment

For deployment, you can use services like Heroku (backend) and Vercel or Netlify (frontend). Be sure to configure environment variables for Firebase and MongoDB connections on the respective platforms.
