import { schema, email, minLength, required } from "@angular/forms/signals";


export const SIGNIN_FORM_INITIAL_VALUES = {
    email: "admin@beauty.tj",
    password: "beauty2026",
}

export const SIGNUP_FORM_INITIAL_VALUES = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "admin@mavluda.beauty",
    password: "password123",
}



export const signinFormSchema = schema<SigninFormModel>((path)=> {
    required(path.email);
    email(path.email);
    required(path.password);
    minLength(path.password, 6);
});

export const signupFormSchema = schema<SignupFormModel>((path)=> {
    required(path.firstName);
    required(path.lastName);
    required(path.phone);
    required(path.email);
    email(path.email);
    required(path.password);
    minLength(path.password, 8);
})

export type SigninFormModel = typeof SIGNIN_FORM_INITIAL_VALUES;
export type SignupFormModel = typeof SIGNUP_FORM_INITIAL_VALUES;