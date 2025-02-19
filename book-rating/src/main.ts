import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  ////////////////


export class Customer {

  // Syntax von TypeScript
  private id: number;

  // Syntax von JavaScript
  #id: number;

  constructor() {
    this.id = 6;
    this.#id = 6;

    console.log(this.#id);

    setTimeout(() => {
      console.log('Hallo Welt', this.#id);
    }, 2000);
  }

  #foobar(arg: string): number {
    return 1;
  }
}



export function abc() {}

export const foo = function (arg) {
  return arg + 1;
}

const foo2 = arg => arg + 1;


const res = (arg => arg + 1)(5)

const result = foo(1)
