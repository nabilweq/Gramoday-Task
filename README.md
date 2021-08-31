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

```http
POST /reports
```

Create a `POST` request by sending the details in request body.<br>
1. The request will look for an existing report with marketID-cmdtyID-date.
2. A user can submit only one report for a commodity in specific market per day
3. Save a report<br><br>
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


## Responses-1

The response is in JSON representation of the resource created or edited.However, if an invalid request is submitted, or some other error occurs, api returns a JSON response in the following format:

```javascript
{
    "status": "success",
    "reportID": "612db4e3496545e401c48b71"
}
```

The `status` attribute contains a message 'success' if the request was successful or the message is 'error' if an error occur.

The `reportID` contain the Id of the report created, if an occur it is `message` containing the error message.

## Request-2

```http
GET /reports?reportID=[REPORT_ID]
```

Create a `GET` request by sending the report id in params which we need to get.<br>
1. The request will find the report and calculate the mean price then send back response.


## Responses-2

The response is in JSON representation of the report.However, if an invalid request is submitted, or some other error occurs, api returns a JSON response in the following format:

```javascript
{
    "_id": "612db4e3496545e401c48b71",
    "cmdtyName": "potato",
    "cmdtyID": "cmdty-1",
    "marketID": "market-1",
    "marketName": "Nabeel shop",
    "users": [
        "user-2",
        "user-1",
        "user-3"
    ],
    "timestamp": "31/08/2021",
    "priceUnit": "Kg",
    "price": "15.00"
}
```

There have two type response :
1. For a successfull request it will send back the report testDetails
2. If the request was invalid it will send back a error message

### Request-3

```http
GET /test?reportID=[REPORT_ID]
```

Create a `GET` request by sending the report id in params which we need to get.<br>
1. The request will find the report and calculate the mean price then send back response.


## Responses-3

The response is in JSON representation of the report.However, if an invalid request is submitted, or some other error occurs, api returns a JSON response in the following format:

```javascript
{
    "_id": "612db4e3496545e401c48b71",
    "cmdtyName": "potato",
    "cmdtyID": "cmdty-1",
    "marketID": "market-1",
    "marketName": "Nabeel shop",
    "users": [
        "user-2",
        "user-1",
        "user-3"
    ],
    "timestamp": "31/08/2021",
    "priceUnit": "Kg",
    "price": "15.00"
}
```

There have two type response :
1. For a successfull request it will send back the report testDetails
2. If the request was invalid it will send back a error message


