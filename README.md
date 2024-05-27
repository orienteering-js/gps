# gps

Utils to process data from orienteering live gps providers with Javascript/Typescript

## Installation

### Deno

```sh
deno add @orienteering-js/gps
```

### Npm

```sh
npx jsr add @orienteering-js/gps
```

### Yarn

```sh
yarn dlx jsr add @orienteering-js/gps
```

### Pnpm

```sh
pnpm dlx jsr add @orienteering-js/gps
```

### Bun

```sh
bunx jsr add @orienteering-js/gps
```

## Usage

### Gpsseuranta

[Gpsseuranta](https://www.tulospalvelu.fi/gps/) is a Finnish orienteering live GPS provider.

```ts
import { parseInit, parseData } from "@orienteering-js/gps/gpsseuranta";

const init = await fetch(
  "https://www.tulospalvelu.fi/gps/20240526_WC_S_M/init.txt"
).then((r) => r.text());

const [mapCallibration, competitors] = parseInit(init);

const data = await fetch(
  "https://www.tulospalvelu.fi/gps/20240526_WC_S_M/data.lst"
).then((r) => r.text());

const competitorsRoutesMap = parseData(data);
```
