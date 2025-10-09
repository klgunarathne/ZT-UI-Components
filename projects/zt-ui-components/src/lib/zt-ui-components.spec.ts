import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZtUiComponents } from './zt-ui-components';

describe('ZtUiComponents', () => {
  let component: ZtUiComponents;
  let fixture: ComponentFixture<ZtUiComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZtUiComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZtUiComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
