# Bankayo docs

Public, open-source documentation for **Bankayo** — a custom **Fineract UI** on
Apache Fineract. The site is written so people searching for **Fineract help**,
**Fineract UI**, and **Fineract customization** can land here, then follow the
operator path (not a replacement for [Apache Fineract](https://fineract.apache.org/)
platform docs).

This site is the canonical operator and feature guide. The Bankayo UI is closed-source; its **?** button opens the matching page here.

## Bankayo vs Fineract

- **Fineract** is the Apache core-banking API (permissions, templates, resources).
- **Bankayo** is the product UI. Pages describe both: what Fineract does, then where that lives in Bankayo (sidebar, docked sheet, wizard).

Please keep that split in contributions. Do not paste private UI internals (`docs/status.md`, seed passwords, tenant URLs) into this repo.

## Develop

```bash
pnpm install
pnpm dev
```

Docs run on **http://localhost:3001**. The UI (private) defaults to `:3000` and should set `NEXT_PUBLIC_DOCS_ORIGIN=http://localhost:3001`.

## Lockstep

Every live Bankayo UI screen must have a slug in the UI `lib/help/routes.ts` map, and that slug must exist as MDX in `content/help`. `pnpm check:pages` verifies every MDX file listed in `content/help` is a real page path.

## License

Documentation in this repository is intended for public contribution. Product source for the Bankayo UI is not included.
