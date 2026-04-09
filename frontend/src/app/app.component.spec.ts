import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { provideRouter } from '@angular/router';
import { AuthService, TelegramService } from '@shared/services';
import { GlobalErrorComponent } from '@shared/ui';

describe('AppComponent', () => {
  let authServiceSpy: Partial<AuthService>;
  let telegramServiceSpy: Partial<TelegramService>;

  beforeEach(async () => {
    authServiceSpy = { checkTelegramAuth: () => {} };
    telegramServiceSpy = { ready: () => {}, expand: () => {} };

    await TestBed.configureTestingModule({
      imports: [AppComponent, GlobalErrorComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TelegramService, useValue: telegramServiceSpy }
      ]
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
