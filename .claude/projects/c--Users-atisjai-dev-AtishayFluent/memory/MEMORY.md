# AtishayFluent Project Memory

## Key Context

- Branch: `usr/atisjai/vegaLiteFluent`
- PR: https://github.com/microsoft/fluentui/pull/35546
- Working on VegaDeclarativeChart component that renders Vega-Lite specs as Fluent UI charts
- Testing ~1056 Vega-Lite schemas from `C:\Users\atisjai\dev\fluentui-charting-contrib\vega_data\`
- Eval files (e2e specs, scripts, screenshots) are on disk but NOT in the PR — to be parked in a separate branch

## Current State (Mar 2, 2026)

- 94 unit tests pass (40 component + 54 adapter), 29 snapshots
- `tsc --noEmit` clean for both `tsconfig.lib.json` and `tsconfig.spec.json`
- No changes to existing DeclarativeChart (Plotly adapter)
- No new dependencies in package.json
- `useUTC` defaults to `true` (UTC) in chart components — snapshots are timezone-stable

## Architecture

- `VegaDeclarativeChart.tsx` — component, chart type detection (`getChartType`), concat layout, shared legend
- `VegaLiteSchemaAdapter.ts` — 12 transformers, validation, aggregation, auto-correction
- `VegaLiteTypes.ts` — TypeScript interfaces for Vega-Lite spec
- `VegaLiteColorAdapter.ts` — color schemes (category10, tableau10, etc.), persistent colorMap
- `VegaDeclarativeChartHooks.ts` — `useIsDarkTheme()`, `useColorMapping()` (shared hooks)

## Chart Type Routing

- `bar + color` → always `stacked-bar` (groups by x, stacks by color)
- `bar + color + xOffset` → `grouped-bar`
- `bar + nominal y` → `horizontal-bar`
- `bar + bin` → `histogram`
- `bar` (no color) → `bar` (converts numeric x to string categories)
- `arc + theta + radius` → `polar`
- `arc + theta` → `donut`
- `rect + x + y + quantitative color` → `heatmap`
- `line/area/scatter/point` → respective types
- `autoCorrectEncodingTypes()` runs BEFORE routing: quantitative+string → nominal

## Key Fixes Applied

1. **Aggregate support** — count/sum/mean/min/max in vertical, horizontal, stacked bar transformers
2. **Heatmap complete grid** — fills missing x/y combinations with 0 for component compatibility
3. **Type auto-correction** — quantitative→nominal when string data detected (pre-routing + in-transformer)
4. **Removed strict validation** — `validateEncodingCompatibility` removed; all bar axis types supported
5. **Stacked bar resilience** — falls back to first unit spec if no bar marks found in layers
6. **hconcat/vconcat shared legend** — `<Legends>` rendered outside grid with `multiSelectLegendProps`
7. **Title extraction** — checks both `encoding.y.title` and `encoding.y.axis.title`
8. **No console.log/warn** — all removed from production code

## Type Definitions Added

- `arc` in VegaLiteMark union
- `xOffset`, `tooltip` in VegaLiteEncoding
- `title`, `timeUnit` in VegaLitePositionEncoding
- `datum` in VegaLiteTextEncoding
- `zero`, `reverse` in VegaLiteScale
- `domain` changed from tuple to array

## CI Notes

- `nx format:write` required after code changes (prettier via nx)
- `react-charts.api.md` must be updated when public API changes (copy from temp/)
- `tsconfig.spec.json` is stricter than `tsconfig.json` — test vars need explicit types
- `a11y-testing:build` and `set-version:build` fail locally (pre-existing, not our issue)

## Useful Patterns

- Storybook: `packages/charts/react-charts/stories/dist/storybook/`
- E2e: textarea injection to load schemas
- Screenshots: `packages/charts/react-charts/stories/screenshots/vega_data/`
- Contact sheets: `scripts/create-contact-sheets.mjs`
- Schemas: `C:\Users\atisjai\dev\fluentui-charting-contrib\vega_data\`

## Vega-Lite Spec Clarifications

- Pie vs Donut: arc without innerRadius = pie (correct per spec)
- Grouped vs Stacked: xOffset = grouped bars (correct per spec)
- Single-point lines: render as dots (not a bug)
- `useUTC` default is `true` — dates render in UTC consistently
