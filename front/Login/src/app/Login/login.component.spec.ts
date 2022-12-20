import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from "./login.component"

describe('LoginComponent',()=>{
    let component:LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations:[LoginComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should be create component', () => {
        expect(component).toBeTruthy
      })
})

