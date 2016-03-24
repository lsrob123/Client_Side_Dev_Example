module SampleServices {
    import app = App;
    import constants = Constants;

    export class CalculatorService {
        static $inject = ["$q"];

        constructor($q: ng.IQService) {
        }

        add(a: number, b: number): number {
            const c = Number(a) + Number(b);
            return c;
        }
    }

    app.app.service(constants.Service.CalculatorService, CalculatorService);
}