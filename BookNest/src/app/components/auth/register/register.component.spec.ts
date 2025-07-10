import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      register: jasmine.createSpy('register').and.returnValue(of(true))
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería registrar y navegar si el formulario es válido', () => {
    component.form.setValue({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });

    component.onSubmit();

    expect(mockAuthService.register).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('no debería registrar si el formulario es inválido', () => {
    component.form.setValue({
      email: '',
      password: '',
      name: ''
    });

    component.onSubmit();

    expect(mockAuthService.register).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
