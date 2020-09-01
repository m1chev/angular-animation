import {
    trigger, 
    state, 
    transition, 
    animate, 
    style, 
    keyframes, 
    useAnimation, 
    query, 
    animateChild, 
    group, 
    stagger
} from "@angular/animations";
import { Component } from '@angular/core';
import { fade, slide, bounceOutLeftAnimation, fadeInAnimation } from "app/animations";

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
      trigger('todosAnimation', [
          transition(':enter', [
              group([
                  query('h1', [
                      style({ transform: 'translateY(-20px)' }),
                      animate(1000)
                  ]),
                  query('@todoAnimation',
                     stagger(200, animateChild()) 
                  )
              ])
          ])
      ]),

      trigger('todoAnimation', [
          transition(':enter', [
              useAnimation(fadeInAnimation, {
                  params: {
                      duration: '500ms'
                  }
              })
          ]),
          transition(':leave', [
              style({ backgroundColor: 'red' }),
              animate(1000),
              useAnimation(bounceOutLeftAnimation)
          ])
      ])
  ]
})
export class TodosComponent {
  items: any[] = [
    'Wash the dishes', 
    'Call the accountant', 
    'Apply for a car insurance'];

  addItem(input: HTMLInputElement) {
    this.items.splice(0, 0, input.value);
    input.value = ''; 
  }

  removeItem(item) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }
}
