# Introduction

This is an express JS API web-service which captures user contributed
reports and returns an aggregate report in response.

Each report consists of a market-commodity combination for which prices in the Mandi(Market)
are provided in a certain unit (along with their conversion factor to base unit - Kg).
You need to combine the reports per market-commodity by calculating the average of the report
prices.

These docs describe how to use the api, how to make request and the possible responses

There have two endpoints
1. To submit the report and retrive a final report
2. To test the api

## Prerequisite

1. Nodejs
2. MongoDB

## Initialisation

Run the commands

```http
1. npm install
```
Create a `.env` file in the root and provide the mongodb connection url and specific the database in `MONGO_URL` variable.<br>
eg :-`MONGO_URL=[CONNECTION_URL]`
```http
2. node index
```
The server will start in Port No: 3000


## Request-1

Create a `POST` request by sending the details in request body.<br>
1. The api will look for an existing report with marketID-cmdtyID-date.
2. A user can submit only one report for a commodity in specific market per day
3. Save a report<br>
A sample request is given below.
```javascript
{
    "reportDetails": {
        "userID": "user-1",
        "marketID": "market-1",
        "marketName": "Nabeel shop",
        "cmdtyID": "cmdty-1",
        "marketType": "Mandi",
        "cmdtyName": "Potato",
        "priceUnit": "Pack",
        "convFctr": 50,
        "price": 700
    }
}
```


```http
POST /reports
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `api_key` | `string` | **Required**. Your Gophish API key |

## Responses

Many API endpoints return the JSON representation of the resources created or edited. However, if an invalid request is submitted, or some other error occurs, Gophish returns a JSON response in the following format:

```javascript
{
  "message" : string,
  "success" : bool,
  "data"    : string
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of deleting a resource, success that the resource was properly deleted.

The `success` attribute describes if the transaction was successful or not.

The `data` attribute contains any other metadata associated with the response. This will be an escaped string containing JSON data.

## Status Codes

Gophish returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

