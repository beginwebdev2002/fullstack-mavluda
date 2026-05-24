import { ChangeDetectionStrategy, Component, inject, output, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import { SIGNIN_FORM_INITIAL_VALUES, SigninFormModel, signinFormSchema } from "@features/auth/model/auth.model";
import { AuthService } from "@entities/user";

@Component({
    selector: "app-signin-form",
    templateUrl: "./signin-form.component.html",
    styleUrls: ["./signin-form.component.scss"],
    imports: [FormField],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent {
    readonly submitted = output<SigninFormModel>();

    isLoading = signal(false);
    showPassword = signal(false);
    signinModel = signal<SigninFormModel>(SIGNIN_FORM_INITIAL_VALUES);
    signinForm = form<SigninFormModel>(this.signinModel, signinFormSchema);
    
    togglePassword() {
        this.showPassword.update((v) => !v);
    }

    onSubmit(event: Event) {
        event.preventDefault();        
        this.submitted.emit(this.signinForm().value());
    }
}