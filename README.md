# dso-slo-examples

Here you can view a collection of examples on how to integrate @massiveinfinity/slo-autometrics library.

## express

1. This is a simple integration that creates a default GET /metrics route
2. Demonstrates how to protect the metrics route with basic auth if needed. Can be modified to support any other required middleware

## simple-function

1. Demonstrates how to integrate `exporter-prometheus-push-gateway` with a single executable function

## serverless

1. Demonstrates how to integrate `exporter-prometheus-push-gateway` with a serverless AWS Lambda function