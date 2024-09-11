# AI-Powered Chatbot

## Project Overview

I developed the AI-Powered Chatbot as a web application to simulate human-like conversations using advanced natural language processing (NLP) capabilities. The project was designed to enhance my experience with Generative AI and showcase how modern AI technologies can be integrated into web applications to create intelligent, user-friendly experiences. The frontend is built using React, while the backend leverages Node.js and integrates the OpenAI GPT API to generate natural language responses.

This chatbot can be used in various scenarios, such as customer service, virtual assistants, or educational tools, highlighting the effectiveness of AI in handling real-time user interactions.

## Features

### Natural Language Processing (NLP)

- The chatbot utilizes OpenAI’s GPT, a powerful language model that processes user inputs in natural language and generates human-like responses.

### Real-Time Interaction

- The chatbot offers real-time responses with minimal delay, ensuring smooth and engaging conversations.

### User Authentication

- JWT (JSON Web Token) authentication is implemented to ensure that only authenticated users can access specific features, enhancing the application's security.

### Persistent Chat History

- Conversations are stored in a Heroku PostgreSQL database, enabling the tracking and analysis of user interactions. This is especially useful for applications that require a record of chat history, such as customer support.

### Topic Continuity

- The chatbot maintains conversation context across multiple exchanges, allowing users to ask follow-up questions and receive responses that build on previous interactions.

### Conversation Context Management

- The chatbot uses chat logs from previous interactions to deliver relevant and coherent responses in ongoing conversations.

### Error Handling

- The system is designed to handle errors smoothly, providing users with informative feedback in case of invalid inputs or system issues.

### User-Friendly Interface

- The chatbot offers a clean, intuitive design that makes it easy for both registered and unregistered users to interact with the system.

### Scalable Backend

- The application is hosted on Heroku, allowing for scalable and reliable cloud-based performance.

### Responsive UI

- The user interface is built with React and is optimized for both desktop and mobile devices, ensuring a seamless user experience across platforms.

## How to Use the AI-Powered Chatbot

### 1. Visit the Application URL

- Open your web browser and go to the deployed application on Heroku by visiting this URL: [AI-Powered Chatbot](https://ai-powered-chatbot-c163b8863896.herokuapp.com/).

### 2. Create an Account (If New User)

- Click the "Register" button on the homepage.
- Complete the registration form by entering your username and password.
- Click the "Register" button to create your account.
- After successful registration, you will be logged in and directed to the chat interface.

### 3. Log In (If Existing User)

- If you already have an account, click the "Login" button on the homepage.
- Enter your username and password in the login form.
- Click the "Login" button to access the chatbot.

### 4. Start a Conversation

- After logging in, you will be directed to the chat interface.
- Type your message or question in the input box and click "Send" or press Enter.
- The chatbot will respond in real-time, and you can continue the conversation by asking follow-up questions.

### 5. View Your Chat History

- You can view previous conversations by accessing your chat history, which is saved in the system for reference.

### 6. Log Out

- To log out, click the "Logout" button on the interface. This will securely log you out and clear your authentication token from local storage.