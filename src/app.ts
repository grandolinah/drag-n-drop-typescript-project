// AUTOBIND DECOCRATOR
const Autobind = (_target: any, _methodName: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  const adjDescroptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);

      return boundFn;
    }
  }

  return adjDescroptor;
};

// VALIDATION
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (validateableInput: Validatable): boolean => {
  let isValid = true;

  console.log(validateableInput)
  if (validateableInput.required) {
    isValid = isValid && validateableInput.value.toString().trim().length !== 0;
  }

  if (validateableInput.minLength && typeof validateableInput.value === 'string') {
    isValid = isValid && validateableInput.value.trim().length > validateableInput.minLength;
  }

  if (validateableInput.maxLength && typeof validateableInput.value === 'string') {
    isValid = isValid && validateableInput.value.trim().length < validateableInput.maxLength;
  }

  if (validateableInput.max && typeof validateableInput.value === 'number') {
    isValid = isValid && validateableInput.value < validateableInput.max;
  }

  if (validateableInput.min && typeof validateableInput.value === 'number') {
    isValid = isValid && validateableInput.value > validateableInput.min;
  }

  return isValid;
};

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 30
    };

    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
      alert('Invalid input please try again');
      return;
    } else {
      this.clearInput();

      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInput  () {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;

      console.log(title, desc, people);
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }
}

const projectInput = new ProjectInput();
