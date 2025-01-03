# personal_website

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Updating Component Data and Uploading Assets

### Updating Component Data
- Component data for the website is stored in JSON files located in the `src/assets/component-data` directory.
- To update project information, modify the `projects-data.json` file.
- For writing and timeline updates, edit `writing-data.json` and `timeline-data.json` respectively.
- Ensure that any changes follow the existing JSON structure to avoid errors.

### Uploading Images and Resume
- Images used in the website should be uploaded to the `public/images` directory.
- Ensure images are optimized for web use to improve load times.
- The resume should be placed in the `public/resume` directory.
- Update any links in the JSON data files to point to the correct paths for new images or resume versions.

By following these instructions, you can easily manage the content and assets of your personal website.
