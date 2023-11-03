import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import "./styles.css";
// import { Requirements } from '../components/Requirements';

const stories = storiesOf("Introduction/Mcp Component Library ", module);

stories.add(
  "App",
  () => {
    return (
      <div className="getting-started-container">
        <h1>Mcp Component Library (MCL) - Getting Started</h1>

        <h2>Contribution Guidelines</h2>
        <p>
          If you want to contribute to the library, please read the{" "}
          <a href="https://github.com/McKesson-Ontada/ontada-component-library/blob/main/CONTRIBUTING.md">
            contribution guidelines
          </a>
          .
        </p>

        <h2>Prerequisites</h2>
        <h3>Create a Personal Access Token</h3>
        <ol>
          <li>
            Create a{" "}
            <a href="https://github.com/settings/tokens">
              personal GitHub access token
            </a>
            .
          </li>
          <li>Grant the token `repo` and `read:packages` permissions.</li>
          <li>
            Copy the token and click the `Enable SSO` button, then follow the
            prompts to authorize.
          </li>
          <li>
            Add the token to your zsh/bash profile as
            `GITHUB_PRIVATE_REPO_ACCESS_TOKEN`.
          </li>
        </ol>

        <h3>Configuring NPM</h3>
        <p>
          Create an <code>.npmrc</code> file in the root directory of your
          component with the following content:
        </p>
        <code>https://mck.jfrog.io/artifactory/ontada-mcp-npm/</code>

        {/* More steps here */}

        <h2>Installation</h2>
        <p>To install Mcp Component Library in your React project, run:</p>
        <div className="code-block">
          <pre>
            <code>npm install --save mcp-component-library</code>
          </pre>
          <pre>
            <code>yarn add mcp-component-library</code>
          </pre>
        </div>

        <h2>Usage</h2>
        <p>Your components/app should be wrapped in MUI's theme provider:</p>
        <div className="code-block">
          <pre>
            <code>
              {`import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from 'mcp-component-library';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button />
    </ThemeProvider>
  );
}`}
            </code>
          </pre>
        </div>
      </div>
    );
  },
  {
    // Use parameters to hide controls and actions
    parameters: {
      controls: { hideNoControlsWarning: true },
    },
  }
);
