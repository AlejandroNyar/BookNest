import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockAuthService = { isAuthenticated: () => true };
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('debería permitir acceso si está autenticado', () => {
    expect(guard.canActivate()).toBeTrue();
  });

  it('debería redirigir si no está autenticado', () => {
    mockAuthService.isAuthenticated = () => false;
    expect(guard.canActivate()).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});