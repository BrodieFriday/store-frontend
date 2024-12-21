import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  
  options = [
    { name: "1 star", value: 1},
    { name: "2 star", value: 2},
    { name: "3 star", value: 3},
    { name: "4 star", value: 4},
    { name: "5 star", value: 5}]
      
  selectedItem: number[] = [];
  selectItem(id: number) {
    if(this.selectedItem.includes(id)){
      this.selectedItem.push(id);
    }
  }
}
