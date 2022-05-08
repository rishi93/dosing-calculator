const swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Dosing Calculator",
    "description": "Calculate Number of pills required for Daily Nutrient Deficiency",
  },
  "host": "localhost:8080",
  "basePath": "/",
  "tags": [
    {
      "name": "Daily Nutrient Deficiency (DND)",
      "description": "Calculate number of pills given DND"
    }
  ],
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/dnd": {
      "post": {
        "tags": [
          "Daily Nutrient Deficiency (DND)"
        ],
        "description": "Calculate number of pills, given Daily Nutrient Deficiency (DND)",
        "parameters": [
          {
            "name": "dnd",
            "in": "body",
            "description": "Daily Nutrient Deficiency (DND)",
            "schema": {
              "$ref": "#/definitions/DND"
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Return number of pills user needs to take",
            "schema": {
              "$ref": "#/definitions/Result"
            }
          }
        }
      },
    }
  },
  "definitions": {
    "Deficiency": {
      "required": [
        "nutrient",
        "target"
      ],
      "properties": {
        "nutrient": {
          "type": "string"
        },
        "target": {
          "type": "number"
        }
      }
    },
    "DND": {
      "type": "array",
      "$ref": "#/definitions/Deficiency"
    }
  }
}

export default swaggerDocument;