# RetailForge Live-Input Demo

These are **synthetic but realistic** retail input files for testing the importer. They are not real customer, supplier, or business data.

## Files

- `products.csv`: product, pricing, sales, inventory, and return-rate records.
- `returns.csv`: return events with reason, customer note, channel, region, size, and refund amount.
- `trend-signals.json`: structured trend signals and evidence.

## Suggested demo flow

1. Open the RetailForge workspace and choose **Import studio**.
2. Upload `products.csv` first and select the product catalog template.
3. Upload `returns.csv` and select the returns template.
4. Upload `trend-signals.json` and select the trend-signal template.
5. Review the validation preview, row warnings, inferred mappings, and duplicate checks.
6. Commit the import in demo mode.
7. Open Returns Intelligence to inspect the Contour Knit Legging root-cause cluster.
8. Open Trend Intelligence to inspect Sculpted utility and compare evidence.

The demo must always show the file name, source type, import timestamp, row count, validation status, and whether the data is demo or live. Never silently treat uploaded files as production data.
