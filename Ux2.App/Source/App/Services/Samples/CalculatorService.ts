module SampleServices {
    import app = App;

    export class CalculatorService {
        static typeName ="CalculatorService";

        add(a: number, b: number): number {
            const c = Number(a) + Number(b);
            return c;
        }
    }

    app.app.service(CalculatorService.typeName, CalculatorService);
}