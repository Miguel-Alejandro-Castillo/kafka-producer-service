# [Kafka Producer](https://kafka.js.org/docs/producing) API with [Fastify](https://fastify.dev/)
REST API service for producing Kafka messages using Fastify.

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

```bash
npm run dev
```

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```bash
npm run start
```

For production mode

```bash
npm run test
```

Run the test cases.

## Running the Application with Docker
This project includes Docker Compose files for running the application in both development and production modes.

### **1. Development Mode**

To build and run the application in development mode, use the following command:
```bash
docker compose -f docker-compose.dev.yaml up -d
```
This will:
* Build the Docker image (if not already built).
* Start the application in development mode.
* Expose the API at [http://localhost:3000](http://localhost:3000).

To stop the application, run:
```bash
docker compose -f docker-compose.dev.yaml stop
```


## API Documentation with [Swagger](https://github.com/fastify/fastify-swagger-ui)
This project includes Swagger for comprehensive API documentation.  
Once the application is running, you can access the Swagger UI at the following URL:

[http://localhost:3000/docs](http://localhost:3000/docs)

### API Endpoints

#### `POST /kafka/publish`

Publishes a message to a Kafka topic.

#### Request Body
The request body must be in JSON format and include the following fields:

```json
{
  "topic": "string",   // (required) Name of the Kafka topic
  "message": "string"  // (required) Content of the message to be sent to Kafka
}
```
#### Response Body

- **200 OK**
  - **Description**: The request was successful, and the message was sent to Kafka.
  - **Example**:
    ```json
    {
      "status": "success",
      "code": 200,
      "message": "Mensaje enviado a Kafka",
      "description": "Publicado en el tópico 'topic'"
    }
    ```

- **400 Bad Request**
  - **Description**: The request was malformed or invalid.
  - **Example**:
    ```json
    {
      "status": "error",
      "code": 400,
      "message": "Solicitud mal formada o inválida",
      "description": "Los datos enviados no cumplen con el formato esperado"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred while sending the message to Kafka.
  - **Example**:
    ```json
    {
      "status": "error",
      "code": 500,
      "message": "Error al enviar el mensaje a Kafka",
      "description": "KAFKA_ERROR_CODE - Descripción del error"
    }
    ```
For more details and to test the API interactively, visit the [Swagger UI](http://localhost:3000/docs).

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).

---

Thank you for using the Kafka Producer API! We hope it helps you build amazing applications. 🚀