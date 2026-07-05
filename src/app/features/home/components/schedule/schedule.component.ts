import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements AfterViewInit {
  @ViewChild('officialRoot', { static: true }) officialRoot!: ElementRef<HTMLDivElement>;

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.loadOfficialHtml();
  }

  private loadOfficialHtml(): void {
    this.http.get('assets/cronograma_ponencias_publico.html', { responseType: 'text' }).subscribe({
      next: (html) => this.renderOfficialHtml(html),
      error: () => {
        this.officialRoot.nativeElement.innerHTML = '<div class="official-error">No se pudo cargar el cronograma oficial.</div>';
      },
    });
  }

  private renderOfficialHtml(html: string): void {
    const container = this.officialRoot.nativeElement;
    container.innerHTML = '';

    const template = document.createElement('div');
    template.innerHTML = html;

    const styleBlocks = Array.from(template.querySelectorAll('style'));
    styleBlocks.forEach((style) => {
      const styleEl = this.renderer.createElement('style');
      styleEl.textContent = this.scopeStyles(style.textContent ?? '');
      this.renderer.appendChild(document.head, styleEl);
    });

    const linkTags = Array.from(template.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"]'));
    linkTags.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || document.head.querySelector(`link[href="${href}"]`)) {
        return;
      }

      const linkEl = this.renderer.createElement('link');
      this.renderer.setAttribute(linkEl, 'rel', link.getAttribute('rel') ?? 'stylesheet');
      this.renderer.setAttribute(linkEl, 'href', href);
      this.renderer.appendChild(document.head, linkEl);
    });

    const bodyInnerHtml = template.querySelector('body')?.innerHTML ?? html;
    container.innerHTML = bodyInnerHtml;

    const scripts = Array.from(template.querySelectorAll('script'));
    scripts.forEach((script) => {
      const scriptEl = document.createElement('script');
      scriptEl.textContent = this.scopeScript(script.textContent ?? '');
      document.body.appendChild(scriptEl);
    });
  }

  private scopeStyles(styleText: string): string {
    return styleText.replace(/([^{]+)\{/g, (match, rawSelector) => {
      const selectors = rawSelector
        .split(',')
        .map((selector: string) => selector.trim())
        .filter(Boolean);

      const scopedSelectors = selectors.map((selector: string) => {
        if (!selector || selector.startsWith('@')) {
          return selector;
        }
        if (selector === ':root') {
          return '.official-root';
        }
        if (selector === '*') {
          return '.official-root *';
        }
        if (selector.startsWith('body')) {
          return `.official-root${selector.slice(4)}`;
        }
        return `.official-root ${selector}`;
      });

      return `${scopedSelectors.join(', ')} {`;
    });
  }

  private scopeScript(scriptText: string): string {
    return scriptText.replace(/document\.body/g, 'document.querySelector(".official-root")');
  }
}
