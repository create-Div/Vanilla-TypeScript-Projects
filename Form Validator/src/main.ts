import { createErrorElement } from "./utils";
import { registrationSchema } from "./schema";

const formEl = document.querySelector("form") as HTMLFormElement;
const inputEls = document.querySelectorAll("input");

function toggleRequiredAttribute(input: HTMLInputElement, isValid: boolean) {
  if (isValid) {
    input.removeAttribute("required");
  } else {
    input.setAttribute("required", "");
  }
}

inputEls.forEach((input) => {
  input.addEventListener("blur", () => {
    const isValid = validateInput(input);
    toggleRequiredAttribute(input, isValid);

    if (input.name === "password") {
      const confirmPasswordInput = document.getElementById(
        "confirm-password"
      ) as HTMLInputElement;
      if (confirmPasswordInput.value) {
        const confirmIsValid = validateInput(confirmPasswordInput);
        toggleRequiredAttribute(confirmPasswordInput, confirmIsValid);
      }
    }
  });

  input.addEventListener("input", () => {
    const existingError = input.nextElementSibling;
    if (existingError?.classList.contains("error")) {
      validateInput(input);
    }
  });
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!formEl.checkValidity()) {
    return;
  }

  const formData = {
    username: (document.getElementById("username") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    password: (document.getElementById("password") as HTMLInputElement).value,
    confirmPassword: (
      document.getElementById("confirm-password") as HTMLInputElement
    ).value,
  };

  const result = registrationSchema.safeParse(formData);

  if (!result.success) {
    document.querySelectorAll(".error").forEach((el) => el.remove());
    document
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0] as string;
      const input = document.querySelector(
        `[name="${
          fieldName === "confirmPassword" ? "confirm-password" : fieldName
        }"]`
      ) as HTMLInputElement;
      if (input) {
        const errorElement = createErrorElement(issue.message);
        input.after(errorElement);
        input.classList.add("input-error");
      }
    });
  } else {
    console.log("✅ Form is valid!", result.data);
    alert("Registration successful!");
    formEl.reset();
  }
});

function validateInput(input: HTMLInputElement): boolean {
  const schemaKey =
    input.name === "confirm-password" ? "confirmPassword" : input.name;

  if (input.name === "confirm-password") {
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const confirmPasswordInput = input;

    const existingError = input.nextElementSibling;
    if (existingError?.classList.contains("error")) {
      existingError.remove();
    }

    if (!confirmPasswordInput.value.trim()) {
      const errorElement = createErrorElement("Please confirm your password");
      input.after(errorElement);
      input.classList.add("input-error");
      return false;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      const errorElement = createErrorElement("Passwords don't match");
      input.after(errorElement);
      input.classList.add("input-error");
      return false;
    }

    input.classList.remove("input-error");
    return true;
  }

  const fieldSchema =
    registrationSchema.shape[
      schemaKey as keyof typeof registrationSchema.shape
    ];
  if (!fieldSchema) return input.checkValidity();

  const result = fieldSchema.safeParse(input.value);

  const existingError = input.nextElementSibling;
  if (existingError?.classList.contains("error")) {
    existingError.remove();
  }

  if (!result.success) {
    const errorMessage = result.error.issues[0].message;
    const errorElement = createErrorElement(errorMessage);
    input.after(errorElement);
    input.classList.add("input-error");
    return false;
  }

  input.classList.remove("input-error");
  return true;
}
