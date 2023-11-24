
## OpenAI API Integration with Express

This Node.js application integrates the OpenAI Assistant's API with an Express server. It allows users to interact with an OpenAI-powered chatbot through a RESTful API.

### Features
- Integration with OpenAI API.
- Express server setup with middleware.
- Endpoint for chat interactions.

### Prerequisites
- Node.js installed.
- An OpenAI API key.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/RaheesAhmed/Assistant-Api.git
   cd openai-express-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

### Usage

1. **Start the Server:**
   ```bash
   npm start
   ```

2. **Interact with the Chatbot:**
   Send a POST request to `/chat` with a JSON payload:
   ```json
   {
     "message": "Your query here"
   }
   ```
   You can use tools like Postman or a frontend interface to send the request.

3. **View Responses:**
   The server will respond with the chatbot's answer.

### Notes

- The application uses `body-parser` for parsing incoming request bodies and `morgan` for HTTP request logging.
- CORS is enabled for cross-origin requests.
- The `createAssistant` function initializes a new OpenAI assistant with specific instructions and settings.
- All chat interactions are managed through the `/chat` endpoint.

### Contributing

Contributions, issues, and feature requests are welcome!

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
