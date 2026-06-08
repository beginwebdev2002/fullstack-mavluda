import { ChangeDetectionStrategy, Component, output, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import { SIGNUP_FORM_INITIAL_VALUES, SignupFormModel, signupFormSchema } from "@features/auth/model/auth.model";

@Component({
    selector: "app-signup-form",
    templateUrl: "./signup-form.component.html",
    styleUrls: ["./signup-form.component.scss"],
    imports: [FormField],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
    readonly submitted = output<SignupFormModel>();
    isLoading = signal(false);
    showPassword = signal(false);
    signupModel = signal<SignupFormModel>(SIGNUP_FORM_INITIAL_VALUES);
    signupForm = form<SignupFormModel>(this.signupModel, signupFormSchema);

    togglePassword() {
        this.showPassword.update((v) => !v);
    }

    onSubmit(e: Event) {
        e.preventDefault();
        this.submitted.emit(this.signupForm().value());
    }
}