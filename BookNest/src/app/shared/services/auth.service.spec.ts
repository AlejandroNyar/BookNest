import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería hacer login correctamente', () => {
    const dummyResponse = { token: 'abc123' };

    service
      .login({ email: 'email@test.com', password: '123456' })
      .subscribe((res) => {
        expect(res).toEqual(dummyResponse);
      });

    const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'email@test.com',
      password: '123456',
    });

    req.flush(dummyResponse);
  });
});
