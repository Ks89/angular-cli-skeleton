// import { TestBed, async } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { CoreModule } from './core/core.module';
// import { SharedModule } from './shared/shared.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { Router } from '@angular/router';
// import { RouterStub } from './shared/testing/helpers.spec';
//
// let router: RouterStub;
//
// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     router = new RouterStub();
//     TestBed.configureTestingModule({
//       imports: [ NgbModule.forRoot(), SharedModule, CoreModule],
//       declarations: [ AppComponent ]
//     }).overrideComponent(AppComponent, {
//       set: {
//         providers: [
//           { provide: Router, useValue: router }
//         ]
//       }
//     });
//   }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title 'app'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('app');
//   }));
//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('KS Welcome');
//   }));
// });
