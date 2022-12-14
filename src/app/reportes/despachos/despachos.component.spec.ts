/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DespachosComponent } from './despachos.component';

describe('DespachosComponent', () => {
  let component: DespachosComponent;
  let fixture: ComponentFixture<DespachosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
