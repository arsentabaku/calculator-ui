import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { evaluate } from '@suprnation/evaluator';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HistoryEntry } from './interfaces';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class CalculatorComponent {
  public form = new FormGroup({
    expression: new FormControl(''),
  });

  public result: number | null = null;
  public error: string | null = null;
  public history: HistoryEntry[] = [];
  public showHistory: boolean = false;

  constructor() {
    this.form.get('expression')?.valueChanges.subscribe((value) => {
      this.evaluateExpression(value || '');
    });
  }

  public evaluateExpression(input: string): void {
    const output = evaluate(input);

    if (output.success) {
      this.result = output.value;
      this.error = null;
      this.addToHistory(input, output.value);
    } else {
      this.result = null;
      this.error = output.reason;
    }
  }

  private addToHistory(expression: string, result: number): void {
    this.history.unshift({ expression, result });
    this.history = this.history.slice(0, 5);
  }
}
