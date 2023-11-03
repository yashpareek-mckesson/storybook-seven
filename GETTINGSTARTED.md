The Mcp Component Library (MCL) is a library for common components

Please see the
[contribution guidelines](https://github.com/mckesson/mcp-frontend-component/blob/main/CONTRIBUTING.md)
if you want to contribute.

# Getting Started

## Prerequisites

### Create a Personal Access Token

You'll need a Personal Access Token to install the package from GitHub Packages

1. Create a [personal Github access token](https://github.com/settings/tokens)
2. Give that token `repo` and `read:packages` permissions.
3. Once you have created the token, make sure to copy your token (hitting the
   `Enable SSO` button will take you away from the page and you'll lose the
   token) and then click the button/dropdown that says `Enable SSO` and follow
   the prompts to authorize.
4. After the token has been authorized, you will need to add the token to your
   zsh/bash profile with the key `GITHUB_PRIVATE_REPO_ACCESS_TOKEN`.

### Configuring NPM

You will need to create an `.npmrc` file in the root directory of your component
with the following contents:

```
@mckesson:registry=https://npm.pkg.github.com/mckesson
```

You may also have to `npm login` if you're getting authentication (or 404)
errors, like so:

`npm login --scope=@mckesson --registry=https://npm.pkg.github.com`

### Configuring Yarn v1

If you're using Yarn v1, follow the above steps for NPM, but also add the following line to your repository's `.yarnrc` file:

```
"@mckesson:registry=https://npm.pkg.github.com/mckesson"
```

### Configuring Yarn v2+

If you're using Yarn v2+, add the following lines to your repository's `.yarnrc.yml` file:

```
npmScopes:
  mckesson:
    npmAlwaysAuth: true
    npmRegistryServer: "https://npm.pkg.github.com"
```

Now run the following command to insert your Github auth token into your global Yarn config (`~/.yarnrc.yml`):

```sh
yarn config set -H 'npmRegistries["//npm.pkg.github.com"].npmAuthToken' "<YOUR GITHUB ACCESS TOKEN>"
```

## Installation

Inside your React project directory, install Mcp Component Library by running
either of the following:

`npm install --save @mckesson/mcp-component-library`

`yarn add @mckesson/mcp-component-library`

All other necessary dependencies will be installed as a part of the core
install.

## Usage

Your components/app will need to be wrapped in
[MUI's theme provider](https://mui.com/material-ui/customization/theming/)
like so:

```
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';


import { Button} from '@mckesson/mcp-component-library';

export const App = () => {
  <ThemeProvider theme={theme}>
    <Button />
  </ThemeProvider>
}
```
