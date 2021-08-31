# Introduction

This is an express JS API web-service which captures user contributed
reports and returns an aggregate report in response.

Each report consists of a market-commodity combination for which prices in the Mandi(Market)
are provided in a certain unit (along with their conversion factor to base unit - Kg).
You need to combine the reports per market-commodity by calculating the average of the report
prices.

These docs describe how to use the api, how to make request and the possible responses

There have two endpoints
1. to submit the report and retrive a final report
2. To test the api

## Prerequisite

1. Nodejs
2. MongoDB

## Use Cases

There are many reasons to use the Gophish API. The most common use case is to gather report information for a given campaign, so that you can build custom reports in software you're most familiar with, such as Excel or Numbers.

However, automating the creation of campaigns and campaign attributes such as templates, landing pages, and more provides the ability to create a fully automated phishing simulation program. This would allow campaigns to be run throughout the year automatically. This also allows the Gophish administrator to be included in the campaigns, since they wouldn't know exactly which day it would start!

## Authorization

All API requests require the use of a generated API key. You can find your API key, or generate a new one, by navigating to the /settings endpoint, or clicking the “Settings” sidebar item.

To authenticate an API request, you should provide your API key in the `Authorization` header.

Alternatively, you may append the `api_key=[API_KEY]` as a GET parameter to authorize yourself to the API. But note that this is likely to leave traces in things like your history, if accessing the API through a browser.

```http
GET /api/campaigns/?api_key=12345678901234567890123456789012
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

