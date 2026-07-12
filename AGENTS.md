# AGENTS.md — Project Guide for AI Coding Agents

This document describes the codebase at `C:\Users\TU_UPTC\Downloads\pagina_geologia`. It is a static SPA for the "XVII Semana Técnica de Geología, Ingeniería Geológica y Geociencias" event at UPTC Sogamoso, Colombia.

## Build / Serve / Test Commands

```bash
npm start          # ng serve — dev server at http://localhost:4200
npm run build      # ng build — production build to dist/
npm run watch      # ng build --watch --configuration development
npm test           # ng test — Karma unit tests (Chrome)
npm run ng -- <cmd> # Direct Angular CLI passthrough
```

There are no single-test commands configured. Tests use Karma + Jasmine. To run a specific spec file, use `npx ng test --include='**/foo.component.spec.ts'` or modify `karma.conf.js` (currently no custom config exists).

## Code Style & Conventions

### Environment Files
- `src/environments/environment.ts` — dev config (production: false)
- `src/environments/environment.prod.ts` — production config (production: true)
- Both files contain `googleMapsApiKey`, `umamiWebsiteId`, and `matomo` config (`url` + `siteId`). Keep in sync.
- Angular CLI replaces `environment.ts` with `environment.prod.ts` when building with `--configuration production` (the default for `ng build`).

### Architecture
- **Angular 17 standalone** — no NgModules. Every component, directive, and pipe is `standalone: true`.
- **Feature-based layout**: `src/app/core/` (singletons, services), `src/app/features/` (feature modules), `src/app/shared/` (reusable directives/pipes).
- **Services** use `providedIn: 'root'`.
- **Routing** in `app.routes.ts` with `title` and `data.description` for SEO.

### Imports
- Group by: Angular core/common/router, third-party libs, then internal `../` relative imports (no index barrels).
- Use `inject()` for DI in components, constructor injection in services.
- No `index.ts` barrel files; import exact paths.

### Formatting
- 2-space indentation, UTF-8, LF line endings (`.editorconfig`).
- Single quotes for `.ts` files, double quotes for HTML.
- Semicolons required.
- No trailing whitespace. Final newline required.

### Naming
- **Files**: `feature.type.ts` — e.g. `hero.component.ts`, `umami.service.ts`, `track-click.directive.ts`.
- **Classes**: PascalCase — `HeroComponent`, `UmamiService`, `TrackClickDirective`.
- **Selectors**: `app-` prefix — `app-hero`, `app-track-click`.
- **Properties/methods**: camelCase — `isMenuOpen`, `trackEvent()`.
- **Umami events**: `snake_case` — `click_cta_registration`, `newsletter_subscribe`.
- **Routes**: kebab-case — `concursos/fotografia`, `cursos-salidas-charlas`.

### Types
- Full strict mode in `tsconfig.json` (`strict: true`). No `any` unless unavoidable.
- Define interfaces locally in the same file (prefer `interface` over `type` for objects).
- Use `ReadonlyArray` or `readonly` for fixed data.
- Use `inject<Type>()` with generics when needed.

### Component Patterns
```typescript
@Component({
  selector: 'app-my-feature',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './my-feature.component.html',
  styleUrl: './my-feature.component.scss'
})
export class MyFeatureComponent {
  private umami = inject(UmamiService);
  readonly icons = { SomeIcon };
  // ...
}
```

### Service Patterns
```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  constructor(private http: HttpClient) {}
  // Use constructor injection in services, inject() in components
}
```

### Routing Patterns
- Defined in `src/app/app.routes.ts`. Every route has a `title` and `data.description` for SEO.
- Redirects: `{ path: 'old-path', redirectTo: 'new-path', pathMatch: 'full' }`
- Wildcard: `{ path: '**', redirectTo: '' }`
- The `SeoService.init()` in `AppComponent` updates meta tags on route change via the activated route data.
- `UmamiService` tracks page views via the `Router.events` stream.

### Lucide Icons Usage
- Import icons as named exports: `import { Menu, X, Moon } from 'lucide-angular';`
- Group them in a readonly object: `readonly icons = { Menu, X, Moon };`
- In templates: `<lucide-angular [img]="icons.Menu" class="w-5 h-5"></lucide-angular>`
- Always self-close the tag and add appropriate sizing classes.

### Dark Mode
- Toggled by adding/removing the `.dark` class on `<html>` via `document.documentElement.classList`
- Preference persisted in `localStorage` under the key `theme` (values: `'dark' | 'light'`)
- Tailwind `dark:` prefix used for dark-mode-specific styles.
- Implemented in `NavbarComponent.toggleDarkMode()`. Tracked via Umami as `toggle_dark_mode`.

### AOS (Animate On Scroll)
- Initialized in `AppComponent.ngOnInit()` with global defaults: duration 1000ms, once, ease-in-out-cubic.
- Usage in templates: `data-aos="fade-up"`, `data-aos-delay="200"`, `data-aos="zoom-in"`.
- Supported animations: `fade-up`, `fade-down`, `fade-right`, `fade-left`, `zoom-in`, `fade-in-up`, etc.

- Templates use `@if` / `@for` (Angular 17 control flow) or `*ngIf` / `*ngFor` (legacy, both accepted).
- Always close self-closing tags: `<lucide-angular ... />`.
- Use `[ngClass]` for conditional classes, not string interpolation.

### Styling
- **Tailwind CSS** utility classes. SCSS for component-specific styles (`styleUrl`, not `styles`).
- Custom colors: `brand-primary`, `brand-secondary`, `brand-accent`, `brand-light`, `brand-dark`.
- Fonts: `Inter` (sans), `Playfair Display` (serif), `DM Mono` (mono).
- Dark mode via `class` strategy: `dark:` prefix, toggled by adding/removing `.dark` on `<html>`.
- No component libraries — pure Tailwind + hand-crafted UI.
- Animations via AOS (`data-aos="fade-up"`).

### Error Handling
- Wrap analytics calls in `try/catch` (`safeTrack` pattern in `UmamiService`).
- Use `catchError` in RxJS pipes for HTTP calls.
- Validate emails client-side before submission.
- Never expose API keys — use `src/environments/` (both `environment.ts` and `environment.prod.ts`).

### Analytics (Umami + Matomo dual)
- **UmamiService** (`core/services/umami.service.ts`) is the primary analytics interface for components. Internally forwards all events to **MatomoService** (`core/services/matomo.service.ts`) for dual tracking.
- **MatomoService** handles `_paq` queue, page views, events, and auto-tracking via `Router.events`. Tracks automatically: JS errors (`enableJSErrorTracking`), heartbeat timer (15s), custom dimensions (page type, theme), engagement (time-on-page thresholds: 15/30/60/120/180/300s, tab visibility, page exit, copy, right-click), form interactions (field focus/blur, submit), media (video/audio play/pause/seek), network status (online/offline), navigation route changes. All `_paq` pushes use `safePush()` with try/catch to prevent crashes from unrecognized methods.
- Components call `umami.trackEvent(name, data?)` — data is automatically sent to both Umami (cloud) and Matomo (self-hosted).
- Event names are `snake_case`. Data objects use string/number/boolean values.
- Always include a `location` or context key in event data for source attribution.
- The Umami script is dynamically injected by `UmamiService` with `data-auto-track="false"` and `data-domains="xviisemanatecnicadegeologia.com,localhost"`.
- The Matomo script is statically loaded in `index.html` only in production (blocked on localhost).
- `TrackClickDirective` (`shared/directives/track-click.directive.ts`) auto-tracks clicks via `UmamiService`. Use `appTrackClick="event_name"` in templates.
- For HTML generated via `innerHTML` (e.g., cursos deck CTAs), click tracking uses event delegation on `.hero-cta` elements with `data-track-kind` and `data-track-title` attributes.

### Matomo Auto-Tracked Categories (no code needed)
- **Navigation** — `route_change` on every router NavigationEnd
- **Engagement** — `time_on_page` (15s/30s/60s/120s/180s/300s), `tab_hidden`/`tab_visible`, `page_exit` (with elapsed seconds), `copy_to_clipboard`, `right_click`
- **Form** — `field_focus`, `field_blur`, `form_submit` (with field/form name)
- **Media** — `play`, `pause`, `seek` (for video/audio elements)
- **Network** — `online`, `offline`
- **Session** — `session_start` (with unique session ID)

### Custom Dimensions (Matomo)
- **Dimension 1** — `page_type`: home, news_list, news_detail, about_event, event_subpage, contest, schedule, speakers, map, gallery, contact, registration, about_project, other
- **Dimension 2** — `theme`: dark, light

### Event Inventory (shared by Umami + Matomo)
- `click_whatsapp`, `click_cta_registration`, `click_social_link`, `click_speaker_social`, `click_news_item`
- `download`, `newsletter_subscribe`, `submit_contact_form`, `view_news_detail`
- `gallery_tab_switch`, `gallery_lightbox_open/close`, `map_marker_click`, `click_google_maps`
- `toggle_dark_mode`, `scroll_depth`, `open_video_modal`, `close_video_modal`, `toggle_promo_sound`
- `nav_link`, `nav_dropdown`, `mobile_nav_link`, `mobile_nav_sub`, `footer_nav`
- `portfolio_pdf_view`, `portfolio_download`, `portfolio_fullscreen`, `portfolio_contact`, `portfolio_download_bottom`
- `view_geolympiads`, `view_photography_contest`
- `click_inscripcion_curso`, `click_inscripcion_evento_magistral`, `click_inscripcion_form`
- `view_pdf`, `click_submit_abstract`, `hero_view_schedule`, `click_submit_abstract_speakers`
- Page views are automatic via `UmamiService.trackRouteChanges()` (for both Umami + Matomo)

### Testing
- Tests only exist if created manually (default: `skipTests: true` in `angular.json`).
- Use Jasmine + Karma. `ng test` launches Chrome.
- No testing utilities (no Testing Library, no Cypress) are installed.

### Key Dependencies
- Angular 17.3, RxJS 7.8, TypeScript ~5.4
- Tailwind CSS 3.4, AOS 2.3, Leaflet 1.9, Lucide Angular 0.577
- No state management library (Signals or services only).
- No SSR/SSG — pure client-side SPA.

### Git Workflow
- No commit conventions enforced. Use imperative mood in commit messages.
- Branch from main, PR into main. Hosted on IONOS with git remote.

### Project-Specific Rules
- `src/.htaccess` is deployed to the server for SPA routing.
- Environment files: `environment.ts` (dev), `environment.prod.ts` (production).
- Google Maps API key and Umami website ID are in environment files.
- The homepage (`/`) uses `HomeComponent` which composes many child components.
- `getPageTitle` in `UmamiService` handles parameterized routes (e.g., `noticias/:id`).
- The Umami script is injected dynamically by `UmamiService` (not in `index.html`). `data-auto-track="false"` is set programmatically.
- The `TrackClickDirective` is a reusable attribute directive (`appTrackClick`) that auto-tracks clicks. Use it in templates instead of manually calling `umami.trackEvent()` when possible.
- `google-drive.service.ts` exists in core services for fetching data from Google Drive; `newsletter.service.ts` handles email subscriptions via PHP backend.
- The `ScheduleComponent` renders its content programmatically using Renderer2 (not Angular templates) — be cautious when modifying it.
- The `MapComponent` uses Leaflet, initialized in `ngAfterViewInit` with SSR guard (`isPlatformBrowser`).
