# vsnote README

1. Install Node Version Manager (nvm): https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
2. Install Node 

```
nvm install node
```

3. Install VSCode Extension Manager

```
npm install @vscode/vsce
```

4. Clone repository locally
5. Install npm dependencies, run within the repository root directory

```
npm install
```

6. Package extension

```
npx @vscode/vsce package
```

7. Install extension

```
code --install-extension vsnote-0.0.1.vsix
```
