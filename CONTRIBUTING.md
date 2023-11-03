# Getting Started

## What to do

Given we are now at a stable V1, we are in need of contributors that can both
help us squash issues, enhance existing components, and build new components.

## Prerequisites

### Create a Personal Access Token

1. Create a [personal Github access token](https://github.com/settings/tokens)
2. Give that token `repo` and `read:packages` permissions.
3. Once you have created the token, make sure to copy your token (hitting the
   `Enable SSO` will take you away from the page and you'll lose the token) and
   then click the button/dropdown that says `Enable SSO` and follow the prompts
   to authorize.
4. After the token has been authorized, you will need to add the token to your
   zsh/bash profile with the key `GITHUB_PRIVATE_REPO_ACCESS_TOKEN`.

### Configure GitHub `npm` registry

```sh
npm login --registry=https://mck.jfrog.io/artifactory/ontada-mcp-npm/
```

This will challenge you for a username, password and email address. Use your
Personal Access Token for the password instead of your github.com password.

## Getting Started

1. Pull down the repository locally with:
   `git clone https://github.com/mckesson/mcp-frontend-component.git`
2. `npm install` to install of the dependencies
3. Run `npm run storybook` to see the visualization of the components.

## Contributing

To contribute, simply make the code changes for the task you are working on and
make create a Pull Request against `main`.

## Tooling decisions

### UI Library: Chakra UI

The MCL uses [Chakra UI](https://chakra-ui.com) and [MUI](https://mui.com/) as it is an accessbility-first
UI library that prides itself on being modular and not doing too much for you,
like Material UI and Ant Design do.

### JS/TS

The MCL uses JS, and all components should be written in JS

### Unit testing

We are using [Jest](https://jestjs.io/) and
[RTL (React Testing Library)](https://testing-library.com/docs/react-testing-library/intro/)
to write unit tests.

### UX review: Storybook and Chromatic

[Chromatic](https://www.chromatic.com/) is a tool that allows designers to
provide feedback on changes to our components and also hosts a Storybook
instance.

When a PR to `main` is created, Chromatic will automatically re-deploy via
GitHub Actions (see .github/workflows/chromatic.yml for details). The UX team
can then review the changes in Chromatic and approve/deny them from there.

The team can join Chromatic with this
[link](https://www.chromatic.com/start?inviteToken=5bc1e094a33b4793a379d141d0c6c635&appId=60b904b0dac2f2003bf84221)

### Component standards

All PRs must meet the following standards:

- One feature or bug fix per Pull Request
- Formatted, linted, and type-safe code written in TypeScript
- Be styled with Emotion
- Be built to UX specification and have approval in Chromatic
- Have a suite of passing unit tests
- Have all variants properly shown as stories in Storybook, including any
  relevant documentation

## Helpful Commands during Development

- You can run all of the components in Storybook with: `npm run storybook`. This
  will auto-reload when you save new changes.
- You can run all of the tests with `npm run test` or if you need an individual
  test run `./node_modules/.bin/jest -i 'file-name.test'

## Design System Figma and Storybook Information

You can render the component alongside the Storybook component like so:

```
import React from "react";
import { Address } from "..";

export default {
  component: Address,
  title: "Address",
};

const Template = (args) => <Address {...args}/>

export const Default = Template.bind({});
export const Selected = Template.bind({});
Default.args = {
    addressLine1:"Loream",
    addressLine2:"Loream Ipusm",
    addressLine3:"Loream Ipsum 3",
    city:"Jaipur",
    zip:"302039",
    state:"Rajasthan",
    countryCode:"18",
    phoneNumber:"+91 90233232223",
    addressWithDirections:true,
    phone:"Phone",
    link:""
}


The `url` property should be the URL of the component in Figma. You can get this
URL by selecting the component and clicking the 'Share' button in the Figma
application.

### Distribution

This repo will be distributed as an npm package, hosted privately by GitHub
packages, when a release is made in GitHub.

GitHub Actions are leveraged to detect when a release has been made, and to
publish the package to our private GitHub Packages Registry.

To use this package in another project, you need to authenticate with GitHub
when running npm commands.

At this time, only Administrators for the repo can publish a release. To publish
a release, simply run `npm run build`, select the version bumps, and once
complete, run `npm publish` to get the packages into the repo for distribution.

### Versioning

The design system uses [Semantic Versioning](https://semver.org/) for its
release numbering, and should be followed strictly.
```
