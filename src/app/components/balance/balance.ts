import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BalanceList } from './balance-list/balance-list';

@Component({
  selector: 'app-balance',
  imports: [BalanceList, RouterOutlet],
  templateUrl: './balance.html',
  styleUrl: './balance.css',
})
export class Balance {
  constructor(public route:ActivatedRoute){}
}
