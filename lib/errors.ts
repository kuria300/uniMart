import { CredentialsSignin } from 'next-auth';
export class InvalidEmailError extends CredentialsSignin {
  code = "Invalid email format";
}

export class RequiredFieldsError extends CredentialsSignin {
  code = "Email or Password Required!";
  message = "required_fields";

  toString() {
    return JSON.stringify({ code: this.code, message: this.message });
  }
}

export class ShortPasswordError extends CredentialsSignin {
  code = "Password must be more than 6 characters!";
}

export class WrongPasswordError extends CredentialsSignin {
  code = "Incorrect Password";
}

export class ProviderConflictError extends CredentialsSignin {
  code = "This account was created with a different provider. Please log in with that provider.";
}