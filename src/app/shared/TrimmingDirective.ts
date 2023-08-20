import { Renderer2 } from '@angular/core';
import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Directive({ selector: '[trimming]' })
export class TrimmingDirective {
  regexStr = '[^!=|<>"()#\'\;]'//'^[a-zA-Z0-9\-_@."()]*$'; s (‘,”,<,>,(,),!,#,…)
  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef, private ngControl: NgControl) { }


  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[#^!|=<>"()';]/g, '');
      event.preventDefault();
      this.ngControl.control.patchValue(this.el.nativeElement.value);
    }, 100)
  }

  @HostListener("change", ["$event"])
  public onInputChange(event: any): void {
    let newValue = event.target.value.replace(/[#^!|=<>"()';]/g, '')
    newValue = newValue.trim();
    console.log(newValue);
    this.ngControl.control.patchValue(newValue);
  }
}
