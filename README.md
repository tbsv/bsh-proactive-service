BSH Proactive Service
==============

This proactive service interacts with the Fitbit Developer API and the BSH HomeConnect API.



## Features

* Fetches health data of Fitbit API
* Trigger events BSH HomeConnect API based on Sleep Logs



## Integrated packages

* Cron (for cronjobs) [Documentation](https://github.com/kelektiv/node-cronn)
* NeDB (for in-memory datastore) [Documentation](https://github.com/louischatriot/nedb)
* Request (for http requests) [Documentation](https://github.com/request/request)
* UIkit (for frontend styling) [Documentation](http://getuikit.com/docs/core.html)



## Configuration

```bash
$ npm install
```
**Note:** You need to set the following variables in your local environment in order to run it locally

* BSH clientId
* BSH clientSecret
* Fitbit clientId
* Fitbit clientSecret
* Fitbit user


## Run

```bash
$ npm start
```



## About

This prototype was developed by [Tobias Vetter](mailto:tobias.vetter@student.reutlingen-university.de).