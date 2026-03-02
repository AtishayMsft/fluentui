# Deep Correctness Analysis for Vega-Lite Chart Schemas

Perform a thorough per-schema correctness analysis comparing rendered chart screenshots against their source Vega-Lite schema definitions.

## Input

- Schema JSON files: `C:\Users\atisjai\dev\fluentui-charting-contrib\vega_data\data_*_vega.json`
- Screenshot PNG files: `C:\Users\atisjai\dev\AtishayFluent\packages\charts\react-charts\stories\screenshots\vega_data\data_*_vega.png`
- Schema metadata CSV: `C:\Users\atisjai\dev\AtishayFluent\schema_analysis.csv`

## Process

For EACH schema (no sampling, no assumptions, no extrapolation):

1. **Read the schema JSON** to extract: mark type, encoding fields (x, y, color, theta, radius), data values, title, axis titles, number of data rows, number of unique series
2. **Read the corresponding screenshot PNG** - ONE AT A TIME, never batch screenshot reads
3. **Compare** the rendered output against the schema definition

## Per-Schema Report (MANDATORY 2-3 lines each)

For every schema, provide exactly this format:

```
### data_NNN_vega
**Verdict**: CORRECT | PARTIAL | TYPE_MISMATCH | DATA_ISSUE | ERROR | BLANK
**Expected**: [chart type] with [N] data points, [N] series, x=[field]([type]), y=[field]([type])
**Rendered**: [what actually rendered - chart type, visible data points, series count, axis labels, title match]
**Issues**: [None | specific description of mismatches found]
```

## Evaluation Criteria

- **Chart Type**: Does the rendered chart type match the schema's mark type? (line->line, bar->bar, arc->donut/pie, rect->heatmap, point->scatter, area->area)
- **Data Completeness**: Are ALL data points/series from the schema visible in the chart? Count visible bars, lines, pie slices, scatter points, heatmap cells.
- **Axis Labels**: Do x-axis and y-axis labels match the schema's field names or axis titles?
- **Color/Series**: If the schema has a color encoding with N unique values, are N distinguishable series/colors visible?
- **Title**: Does the chart title match the schema's title field?
- **Data Values**: Do visible data values (bar heights, line positions, pie proportions) appear reasonable for the source data?

## Verdicts

- **CORRECT**: Chart type matches, all data visible, axes and title correct
- **PARTIAL**: Chart renders but has minor issues (e.g., pie instead of donut, log scale not applied, some labels truncated)
- **TYPE_MISMATCH**: Wrong chart type rendered (e.g., schema says scatter but renders as bar)
- **DATA_ISSUE**: Right chart type but data appears wrong/incomplete (missing series, wrong values, missing data points)
- **ERROR**: Red error boundary with "Error rendering chart:" message visible
- **BLANK**: No chart rendered in the preview area

## Enforcement Rules

- DO NOT skip any schema
- DO NOT write "assumed CORRECT" - you MUST read each screenshot
- DO NOT extrapolate from patterns - each schema must be individually verified
- Read only ONE screenshot at a time - never batch multiple screenshot reads in a single tool call
- Screenshots must be no older than 1 hour - before starting analysis, check file timestamps and if screenshots are stale, re-run Playwright e2e tests first: `cd packages/charts/react-charts/stories && npx playwright test VegaDeclarativeChart.e2e.spec.ts`
- If you cannot read a screenshot, mark it as UNVERIFIED with reason

## Batch Size

To ensure thoroughness, process schemas in batches of **30-40 max per agent**. This ensures every screenshot is individually read and analyzed with full attention.

## Output

Generate a structured report with:

1. Per-schema analysis (2-3 lines each as specified above)
2. Summary table with verdict counts
3. List of specific issues found, grouped by issue type
