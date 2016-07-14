Tests
-----

The tests are written with [The Intern](https://theintern.github.io/).

# Installation

Only integration tests are used, but for this we also need Selenium. The following shows how to get these dependencies.

## The intern

```sh
npm install
```

Tested with "node --version v4.2.2".

## Selenium

Selenium is an interface that can interact with multiple browsers for testing. You can get it [here](http://www.seleniumhq.org/download/)
You can start it with the following line, no configuration should be necessary. It should be running before you start the tests.

```sh
java -jar selenium-server-standalone-2.53.0.jar
```


# Execution

```sh
./node_modules/.bin/intern-runner config=tests/intern
```



