import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLstComponent } from './post-lst.component';

describe('PostLstComponent', () => {
  let component: PostLstComponent;
  let fixture: ComponentFixture<PostLstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
