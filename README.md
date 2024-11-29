# front common components

## Getting started
### prepare environment

Install node packages

```bash
pnpm i
```

### create new component
to create new component use the command line tool

```bash
pnpm run generate <component name>
```

this command create necessary files in path: `lib/components/<component name>`
```bash
.
├── component.stories.tsx           # component storybook file
├── component.test.tsx              # test file using vitest
├── component.type.tsx              # component types
└── index.tsx                       # actual component code
```

### components
to browse available components run storybook

```bash
pnpm run storybook
```
## how to build
to build for next environment it should be build and pack. without pack it doesn't work on next environment
for this purpose there is a tar command that first clean the folders then build the package and make a tar file in
the dist folder.
```bash
pnpm run tar
```
## How to use
### dev env
for dev environment clone the repo and install the package in the consumer application with below command

```bash
pnpm install --save ../<path to cloned folder>
```