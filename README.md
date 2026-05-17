<a href="https://angular-package.dev"  target='_blank'>
  <img
    src="https://avatars.githubusercontent.com/u/31412194?s=400&u=c9929aa36826318ccac8f7b84516e1ce3af7e21c&v=4"
    width="20%"
    title="@angular-package/signals - A lightweight angular package for the signals store."
  />
</a>

## @angular-package/signals

A **lightweight** angular package for the signals store.

[![Gitter][gitter-badge]][gitter-chat]
[![Discord][discord-badge]][discord-channel]
[![Twitter][twitter-badge]][twitter-follow]

<!-- npm badge -->
[![npm version][package-npm-badge-svg]][package-npm-badge]

<!-- GitHub badges -->
[![GitHub issues][package-badge-issues]][package-issues]
[![GitHub forks][package-badge-forks]][package-forks]
[![GitHub stars][package-badge-stars]][package-stars]
[![GitHub license][package-badge-license]][package-license]

<!-- Sponsors -->
[![GitHub Sponsors][github-badge-sponsor]][github-sponsor-link]
[![Patreon Sponsors][patreon-badge]][patreon-link]

## Table of contents

* [Documentation](#documentation)
* [Api](#api)
  * [SignalsChannel](#signalschannel)
  * [Signals](#signals)
* [Changelog](#changelog)
* [Contributing](#contributing)
* [Code of Conduct](code-of-conduct)
* [Git](#git)
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)

## Documentation

The documentation is in construction and it's available at [https://docs.angular-package.dev/v/signals](https://docs.angular-package.dev/v/signals/)

## Api

### `SignalsChannel`

An injectable Angular service that extends the `Signals` class to provide a channel for managing signals with additional configuration and event emission capabilities.

```typescript
import { SignalsChannel } from '@angular-package/signals';
```

### Signals

The `Signals` class provides a structured way to manage a collection of signals, which are reactive data sources that can be observed for changes.
It allows you to add, remove, update, and retrieve signals based on keys, as well as create effects that run when specific signals change.
The class is designed to be flexible and type-safe, making it easier to work with reactive data in Angular applications.

```typescript
import { Signals } from '@angular-package/signals'; 
```

## Changelog

To read it, click on the [CHANGELOG.md][package-github-changelog] link.

## Contributing

Your contributions are valued! If you'd like to contribute, please feel free to submit a pull request. Help is always appreciated.

## Support

If you find this package useful and would like to support its and general development, you can contribute through one of the following payment methods. Your support helps maintain the packages and continue adding new.

Support via:

* [4Fund](https://4fund.com/bruubs)
* [DonorBox](https://donorbox.org/become-a-sponsor-to-the-angular-package?default_interval=o)
* [GitHub](https://github.com/sponsors/angular-package/sponsorships?sponsor=sciborrudnicki&tier_id=83618)
* [Ko-fi](https://ko-fi.com/sterblack)
* [OpenCollective](https://opencollective.com/sterblack)
* [Patreon](https://www.patreon.com/checkout/angularpackage?rid=0&fan_landing=true&view_as=public)
* [PayPal](https://paypal.me/sterblack)
* [Stripe](https://donate.stripe.com/dR614hfDZcJE3wAcMM)
* ~~[Revolut](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29)~~

or via Trust Wallet

* [BNB](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)
* [BTC](https://link.trustwallet.com/send?coin=0&address=bc1qnf709336tfl57ta5mfkf4t9fndhx7agxvv9svn)
* [ETH](https://link.trustwallet.com/send?coin=60&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)
* [USDT (BEP20)](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94&token_id=0x55d398326f99059fF775485246999027B3197955)
* [XLM](https://link.trustwallet.com/send?coin=148&address=GAFFFB7H3LG42O6JA63FJDRK4PP4JCNEOPHLGLLFH625X2KFYQ4UYVM4)

Thanks for your support!

## Code of Conduct

By participating in this package, you agree to follow **[Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**.

## GIT

### Commit

* [AngularJS Git Commit Message Conventions][git-commit-angular]
* [Karma Git Commit Msg][git-commit-karma]
* [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

**Given a version number MAJOR.MINOR.PATCH, increment the:**

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © angular-package ([license][package-license])

<!-- Funding -->
[github-badge-sponsor]: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/angular-package
[github-sponsor-link]: https://github.com/sponsors/angular-package
[patreon-badge]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dangularpackage%26type%3Dpatrons&style=flat
[patreon-link]: https://www.patreon.com/join/angularpackage/checkout?fan_landing=true&rid=0

[angulario]: https://angular.io
[skeleton]: https://github.com/angular-package/skeleton

<!-- Update status -->
[experimental]: https://img.shields.io/badge/-Experimental-orange
[fix]: https://img.shields.io/badge/-Fix-red
[new]: https://img.shields.io/badge/-eNw-green
[update]: https://img.shields.io/badge/-Update-red
[documentation]: https://img.shields.io/badge/-Documentation-informational
[demonstration]: https://img.shields.io/badge/-Demonstration-green

<!-- Discord -->
[discord-badge]: https://img.shields.io/discord/925168966098386944?style=social&logo=discord&label=Discord
[discord-channel]: https://discord.com/invite/rUCR2CW75G

<!-- Gitter -->
[gitter-badge]: https://img.shields.io/gitter/room/angular-package/ap-sass?style=social&logo=gitter
[gitter-chat]: https://app.gitter.im/#/room/#ap-sass:gitter.im

<!-- Twitter -->
[twitter-badge]: https://img.shields.io/twitter/follow/angularpackage?label=%40angularpackage&style=social
[twitter-follow]: https://twitter.com/angularpackage

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/

<!-- This package: sass  -->
  <!-- GitHub: badges -->
  [package-badge-issues]: https://img.shields.io/github/issues/angular-package/signals
  [package-badge-forks]: https://img.shields.io/github/forks/angular-package/signals
  [package-badge-stars]: https://img.shields.io/github/stars/angular-package/signals
  [package-badge-license]: https://img.shields.io/github/license/angular-package/signals
  <!-- GitHub: badges links -->
  [package-issues]: https://github.com/angular-package/signals/issues
  [package-forks]: https://github.com/angular-package/signals/network
  [package-license]: https://github.com/angular-package/signals/blob/master/LICENSE
  [package-stars]: https://github.com/angular-package/signals/stargazers
<!-- This package -->
  [package-github-changelog]: https://github.com/angular-package/signals/blob/main/CHANGELOG.md

<!-- Package: package -->
  <!-- npm -->
  [package-npm-badge-svg]: https://badge.fury.io/js/@angular-package%2Fsignals.svg
  [package-npm-badge-png]: https://badge.fury.io/js/@angular-package%2Fsignals.png
  [package-npm-badge]: https://badge.fury.io/js/@angular-package%2Fsignals
  [package-npm-readme]: https://www.npmjs.com/package/@angular-package/signals#readme

  <!-- GitHub -->
  [package-github-readme]: https://github.com/angular-package/signals#readme
