import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { Submit } from "./submit";
import { SubmitModelBinder } from "../submitModelBinder";
import { SubmitViewModelBinder } from "./submitViewModelBinder";


export class SubmitModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("submit", Submit);
        injector.bindToCollection("modelBinders", SubmitModelBinder);
        injector.bindToCollection("viewModelBinders", SubmitViewModelBinder);
    }
}