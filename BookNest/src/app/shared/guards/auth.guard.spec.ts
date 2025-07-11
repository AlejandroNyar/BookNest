import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    //Manual mock, since jasmine doesn't handle getters correclty  
    mockAuthService = {
      _value: true,
      get isAuthenticated() {
        return this._value;
      }
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('debería permitir acceso si está autenticado', () => {
    mockAuthService._value = true;
    expect(guard.canActivate()).toBeTrue();
  });

  it('debería redirigir si no está autenticado', () => {
    mockAuthService._value = false;
    expect(guard.canActivate()).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
