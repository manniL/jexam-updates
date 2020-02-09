# jExam Updates

A simple javascript tool that sends a tweet when new exam results are
available on the
[TU Dresden jExam tool](http://jexam.inf.tu-dresden.de/)

## Getting Started


These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.
### Prerequisites

To install the tool on your machine, you'll need:

* [NodeJS and Yarn](https://nodejs.org/)
* A cronjob to trigger it (no automated monitoring on purpose)


* **or** Docker to use the included dockerfile which already includes Node, Yarn and a cronjob

Okay, you got these? Great, let's continue!

### Installing

#### Without docker

1. Pull the application and switch to the correct branch (mostly `develop`, or `master` if you want to deploy)
2. Get all dependencies by using `yarn`
3. Copy the config.example.json file and enter your twitter app credentials.
4. Run `yarn start` to trigger the script. (Better set up a cronjob that does it every x minutes)

#### With docker

1. Create a config.json (copy the config.example.json first and add your twitter app credentials).
2. Build an image from the Dockerfile and start a container based on it

## Deployment

Deployment works similar to installation. Just go for `master` instead of `develop`.

## Possible errors and there solutions

None known by now

## Built With

* [NodeJS and Yarn](https://nodejs.org/) - Backend javascript and dependency
management
* [Twit](https://github.com/ttezel/twit) - Great (promise-based) Twitter API

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, take a look in [our repository](https://github.com/manniL/jexam-updates).

## Contribution

Contributions are welcome at any time! Just make sure that you follow the [JS Standard Style](https://standardjs.com/rules.html) and common good practices (like DRY) when contributing.
If you see parts of the code that don't follow those rules, you are free to submit a PR to fix that!

## Authors

* **Alexander Lichter** - *Main work on the project* - [Website](http://developmint.de) - [BitBucket](https://bitbucket.org/manniL/) - [Github](https://github.com/manniL) - [StackOverflow](http://stackoverflow.com/users/3975480/mannil)

See also the [list of contributors](https://github.com/manniL/jexam-updates/contributors) who participated in this project.

## License

See [LICENSE file](https://github.com/manniL/jexam-updates/blob/master/LICENSE)
