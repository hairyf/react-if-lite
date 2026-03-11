# react-if-lite

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Lightweight conditional rendering for React. Declarative `<If>`, `<Unless>`, and `<Switch>` components with optional `<Then>` / `<Else>` and `<Case>` / `<Default>` children. By default no wrapper element is rendered.

## Install

```bash
npm install react-if-lite
# or
pnpm add react-if-lite
# or
yarn add react-if-lite
```

## Usage

```jsx
import { Case, Default, Else, If, Switch, Then, Unless } from 'react-if-lite'
```

### If / Then / Else

Turn a ternary into a more readable block:

```jsx
function Bar({ name, age, drinkingAge }) {
  return (
    <div>
      <If cond={age >= drinkingAge}>
        <Then>
          <span className="ok">
            Have a beer,
            {name}
            !
          </span>
        </Then>
        <Else>
          <span className="not-ok">
            Sorry,
            {name}
            , you are not old enough.
          </span>
        </Else>
      </If>
    </div>
  )
}
```

Shorthand with props (no `<Then>` / `<Else>` children):

```jsx
<If cond={isLoggedIn} then={<Profile />} else={<Login />} />
```

### Unless

Renders children when the condition is false:

```jsx
<Unless cond={isLoading}>
  <Then>
    <span>Content is ready</span>
  </Then>
  <Else>
    <span>Loading...</span>
  </Else>
</Unless>
```

Or shorthand:

```jsx
<Unless cond={hasError}>No error</Unless>
```

### Switch / Case / Default

Render the first matching `<Case>`, or `<Default>` if none match:

```jsx
function Example() {
  const myNumber = 3
  return (
    <div>
      <Switch>
        <Case cond={myNumber === 9}>Nine</Case>
        <Case cond={myNumber > 1}>Greater than one</Case>
        <Default>Fallback</Default>
      </Switch>
    </div>
  )
}
```

Value-based matching (first `<Case>` whose `cond` equals `value`):

```jsx
<Switch value={status}>
  <Case cond="loading">Loading...</Case>
  <Case cond="error">Something went wrong</Case>
  <Case cond="success">Done!</Case>
  <Default>Unknown status</Default>
</Switch>
```

### Wrapping with `as`

By default there is no wrapper. Use `as` to wrap the chosen branch in an element or component; other props (e.g. `className`) are passed through.

```jsx
<If as="div" className="card" cond={isActive}>
  <Then><p>Active</p></Then>
  <Else><p>Inactive</p></Else>
</If>
// Renders:
// <div class="card">
//   <p>Active</p> or <p>Inactive</p>
// </div>
```

With a custom component:

```jsx
<If cond={!loading} as={AnimatePresence} initial={false}>
  <Then
    as={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* ... */}
  </Then>
  <Else
    as={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* ... */}
  </Else>
</If>
// AnimatePresence receives initial={false} and the chosen child as children
```

## License

[MIT](./LICENSE) License © [hairyf](https://github.com/hairyf)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/react-if-lite?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/react-if-lite
[npm-downloads-src]: https://img.shields.io/npm/dm/react-if-lite?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/react-if-lite
[bundle-src]: https://img.shields.io/bundlephobia/minzip/react-if-lite?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=react-if-lite
[license-src]: https://img.shields.io/github/license/hairyf/react-if-lite.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hairyf/react-if-lite/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/react-if-lite
