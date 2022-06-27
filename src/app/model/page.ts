import { PAGE_SIZE, INITIAL_PAGE } from '../util/constants';

export class Page {

  number: number;

  size: number;

  totalElements: number;

  constructor() {
    this.number = INITIAL_PAGE;
    this.size = PAGE_SIZE;
  }

}
