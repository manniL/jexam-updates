# jExam Updates

A simple javascript tool that sends a tweet when new exam results are
available on the
[TU Dresden jExam tool](http://jexam.inf.tu-dresden.de/)

## Getting Started


These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.
### Prerequisites

To install the tool on your machine, you'll need:

* [NodeJS and NPM](https://nodejs.org/)
* A cronjob to trigger it (no automated monitoring on purpose)

Okay, you got these? Great, let's continue!

### Installing

1. Pull the application and switch to the correct branch (mostly `develop`, or `master` if you want to deploy)
2. Get all dependencies by using `npm install`
3. Enter your twitter app credentials and your API key for [rss2jon](http://rss2json.com/) (don't worry, it's free).
4. Run `npm start` to trigger the script. (Better set up a cronjob that does it)

## Deployment

Deployment works similar to installation. Just go for `master` instead of `develop` and use `npm run production`

## Possible errors and there solutions

None known by now

## Built With

* [NodeJS and NPM](https://nodejs.org/) - Backend javascript and dependency
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