/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KardexComponent } from './kardex.component';

describe('KardexComponent', () => {
  let component: KardexComponent;
  let fixture: ComponentFixture<KardexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KardexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
