import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { DateInput } from "./ko/dateInput";
import { DateInputModelBinder } from "./dateInputModelBinder";
import { DateInputViewModelBinder } from "./ko/dateInputViewModelBinder";


export class DateInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("dateInput", DateInput);
        injector.bindToCollection("modelBinders", DateInputModelBinder);
        injector.bindToCollection("viewModelBinders", DateInputViewModelBinder);
    }
}