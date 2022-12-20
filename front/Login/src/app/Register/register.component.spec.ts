import { RegisterUserComponent } from "./register.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('LoginComponent',()=>{
    let component:RegisterUserComponent;
    let fixture: ComponentFixture<RegisterUserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations:[RegisterUserComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should be create component', () => {
        expect(component).toBeTruthy
      })
})

