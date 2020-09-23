import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { TimeInput } from "./ko/timeInput";
import { TimeInputModelBinder } from "./timeInputModelBinder";
import { TimeInputViewModelBinder } from "./ko/timeInputViewModelBinder";


export class TimeInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("timeInput", TimeInput);
        injector.bindToCollection("modelBinders", TimeInputModelBinder);
        injector.bindToCollection("viewModelBinders", TimeInputViewModelBinder);
    }
}