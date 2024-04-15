## Express + Autometrics example

Simple Express API instrumented with Autometrics and using the Prometheus
exporter.

### Running the example

To see autometrics in action:

0. Clone the repo

1. Install the dependencies

```shell
npm install
```

2. Build and run the application

```shell
npm run build
```

```shell
MASSIVE_TENANT_ID=sample-tenant-id npm start

# or with protected route

MASSIVE_TENANT_ID=sample-tenant-id PROTECT_ROUTE=true  npm start
```

The example should run and generate some sample traffic by itself

