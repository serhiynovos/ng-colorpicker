import { Directive, OnInit, ElementRef, Output, EventEmitter, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Directive({
  selector: '[colorpicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorpickerDirective),
      multi: true,
    }
  ]
})
export class ColorpickerDirective implements OnInit, ControlValueAccessor {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(
    private elRef: ElementRef,
  ) {
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    $(this.element)['spectrum']({
      showInput: true
    })
      .on('change', (e) => {
        this.onChange($(e.target)['spectrum']('get').toHexString());
      });
  }

  onChange: (_: any) => void;
  onTouched: () => void;
  writeValue(value: string): void {
    $(this.element)['spectrum']('set', value);
  }
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}