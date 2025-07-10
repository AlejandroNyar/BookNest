import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

describe('LoginComponent', () => {
   let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = { login: jasmine.createSpy('login').and.returnValue(of(true)) };
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a login y navegar si las credenciales son correctas', () => {
    component.form.setValue({
      email: 'test@example.com',
      password: '123456'
    });

    component.onSubmit();
    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  
   it('no debería hacer login si el formulario es inválido', () => {
    component.form.setValue({ email: '', password: '' });

    component.onSubmit();

    expect(mockAuthService.login).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
