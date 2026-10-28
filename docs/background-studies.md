# Background studies

The home hero collage has been removed. The shared v2 layout now uses a decorative
background, so the same visual treatment appears on the home page, archives,
articles, About, and Contact.

Paper is the selected direction and the default on every v2 page. Its surface
combines fine grain, elongated pulp texture, short curved fibers, and small flecks.
A layered stipple impression adds more detail at the edge. The texture uses 11%
ink in light mode and 6.5% in dark mode. The paisley component, styles, and assets have been
removed; old `?background=paisley` links fall back to paper.

The header, page, forms, and footer share the warm paper palette. Dark mode uses
neutral charcoal with less grain.

The decorative backdrop belongs to the application shell, spanning the main
content, the space before the footer, and the footer itself. The paper footer is
transparent and retains its divider, avoiding a flat band where the grain ends.

Compare the treatments on the development server:

| Treatment | Preview | Direction |
| --- | --- | --- |
| Paper (default) | [Home](http://localhost:3000/) | Layered grain, fine fibers, warm paper, edge stipple |
| Original paper study | [Home](http://localhost:3000/?background=paper-original) | Original neutral palette and regular dot texture |
| Drafting | [Home](http://localhost:3000/?background=drafting) | Faint grid, circular construction lines, blue plotting marks |
| Contours | [Home](http://localhost:3000/?background=contours) | Soft blue color field with flowing contour lines |
| Plain | [Home](http://localhost:3000/?background=plain) | Collage removed, without a replacement background |

Append the same `background` query parameter to any v2 route to compare it there,
for example `/about?background=paper`. Navigation without the query parameter
returns to paper. Unknown values also use paper.

All treatments use the existing semantic color tokens and adapt to the current
theme. They are static, excluded from the accessibility tree, do not intercept
input, and are hidden when printing or using forced colors. Mobile crops keep
the linework away from the text. Paper uses a 320px procedural SVG as
an alpha mask, tinted with the semantic text color. Grain continues through the
footer and its outer spacing.
The pattern uses no raster assets.

Implementation: `apps/web/src/layout/v2/components/SiteBackground.tsx` and
`apps/web/public/css/v2/SiteBackground.css`; texture source:
`apps/web/public/assets/textures/paper-grain.svg`.
The original collage assets remain on
disk, unreferenced, for now.

Validation: production JavaScript bundle, PostCSS generation, component ESLint,
formatting, and static rendering of the default and explicit
treatments passed. Browser checks covered both themes, 390/768/1440px widths,
the main routes and an article, print, and forced colors. No collage image
requests or horizontal overflow were observed. A separate CSS ESLint run reports
validator limitations around semantic color variables, `color-mix()`, and masks;
the repository's normal lint command targets JavaScript and TypeScript.
