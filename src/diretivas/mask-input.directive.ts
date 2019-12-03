/**
 * Diretiva de máscara genérica em campo de texto.
 *
 * CPF: <input type="text" maskInput="999.999.999-99">
 * CNPJ: <input type="text" maskInput="99.999.999/9999-99">
 * CEP: <input type="text" maskInput="99999-999">
 */

import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[maskInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MaskInputDirective,
      multi: true
    }
  ]
})
export class MaskInputDirective implements ControlValueAccessor {
  onTouched: any;
  onChange: any;

  @Input('maskInput') maskInput: string;

  constructor(private el: ElementRef) {}

  writeValue(value: any): void {
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event'])
  onInput($event: any) {
    let valor = $event.target.value.replace(/\D/g, '');

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    let pad = this.maskInput.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    $event.target.value = this.aplicarMascara(valor);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.maskInput.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valor
   * @return string
   */
  aplicarMascara(valor: string): string {
    valor = valor.replace(/\D/g, '');
    let pad = this.maskInput.replace(/\D/g, '').replace(/9/g, '_');
    let valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;

    valor = '';
    for (let i = 0; i < this.maskInput.length; i++) {
      if (isNaN(parseInt(this.maskInput.charAt(i)))) {
        valor += this.maskInput.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }
}
