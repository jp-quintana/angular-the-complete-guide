import { Injectable } from '@angular/core';
import { calculateInvestmentResults } from '../../investment-results';

import { AnnualData, InvestmentValues } from './investment-results.model';

@Injectable({ providedIn: 'root' })
export class InvestmentResultsService {
  results: AnnualData[] = [];

  addResults(values: InvestmentValues) {
    const results = calculateInvestmentResults(values);

    this.results = results;
  }
}
