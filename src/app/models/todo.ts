export class TodoElement {
  id: number;
  text: string;
  checked: boolean;

  constructor(
    input: {
      id: number,
      text: string,
      checked?: boolean
    }
  ) {
    this.id = input.id;
    this.text = input.text;
    this.checked = input.checked ?? false;
  }
}