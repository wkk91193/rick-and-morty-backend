const swaggerJson = `{
  "swagger": "2.0",
  "info": {
    "title": "Rick and Morty API",
    "version": "1.0.0",
    "description": "API documentation for the Rick and Morty characters service"
  },
  "host": "${process.env.SWAGGER_URL}",
  "basePath": "/",
  "schemes": ["http"],
  "paths": {
    "/api/characters": {
      "get": {
        "summary": "Get characters",
        "description": "Retrieve a list of characters with optional filters",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "type": "integer",
            "description": "Page number"
          },
          {
            "name": "species",
            "in": "query",
            "type": "string",
            "description": "Filter by species"
          },
          {
            "name": "status",
            "in": "query",
            "type": "string",
            "description": "Filter by status"
          },
          {
            "name": "sort",
            "in": "query",
            "type": "string",
            "description": "Sort by character name"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "schema": {
              "type": "object",
              "properties": {
                "results": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/Character"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/characters/{id}": {
      "get": {
        "summary": "Get character by ID",
        "description": "Retrieve details of a character by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "Character ID"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "schema": {
              "$ref": "#/definitions/Character"
            }
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    }
  },
  "definitions": {
    "Character": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "image": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "species": {
          "type": "string"
        },
        "origin": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          }
        },
        "location": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          }
        },
        "episode": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "episode": {
                "type": "string"
              },
              "air_date": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}`;

export const swaggerConfig = JSON.parse(swaggerJson);
