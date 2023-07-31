# K6 Load Testing Template

### Start building your load tests with webpack
```
docker-compose -p k6 up build promtail
```
For production build, set watch to false in webpack.config.js

### Start Grafana, Loki and other logging tools
```
docker-compose -p logs -f docker-compose-log.yaml up
```

### Start running your load tests
```
TEST=transaction-history SCENARIOS=ramp LOG_FILE=$(date +%F_%H-%M-%S) docker-compose -p k6 up --force-recreate --build k6
```
Here,
- `TEST` is the name of the test file without the extension
- `SCENARIOS` is the name of the scenario, mention multiple scenarios separated by comma
- `LOG_FILE` is the prefix of the log file

All of the containers run in host network mode, so you can access the services directly from your host machine.