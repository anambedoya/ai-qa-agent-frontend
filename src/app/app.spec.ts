import { TestBed } from '@angular/core/testing';
import { appConfig } from './app.config';
import { App } from './app';

// BOOT-002: the standalone shell starts with its real application providers.
describe('Application foundation', () => {
  it('renders the foundation inside a main landmark', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: appConfig.providers,
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const main = (fixture.nativeElement as HTMLElement).querySelector('main');
    expect(main?.querySelector('h1')?.textContent).toBe('AI QA Agent');
    expect(main?.textContent).toContain('The project foundation is ready.');
  });
});
