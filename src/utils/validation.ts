namespace App {
  // VALIDATION
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export const validate = (validateableInput: Validatable): boolean => {
    let isValid = true;

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
      isValid = isValid && validateableInput.value >= validateableInput.min;
    }

    return isValid;
  };
}
