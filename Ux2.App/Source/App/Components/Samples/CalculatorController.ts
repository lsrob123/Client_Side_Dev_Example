
module SampleComponents {
    import app = App;
    import sampleServices = SampleServices;

    export class CalculatorController {
        static typeName = "CalculatorController";

        static $inject = ["$scope", sampleServices.CalculatorService.typeName];

        numberA: number;
        numberB: number;
        numberC: number;

        constructor(private $scope: ng.IScope, private calculatorService: sampleServices.CalculatorService) {
        }

        add(): void {
            this.numberC = this.calculatorService.add(this.numberA, this.numberB);
        }
    }

    app.app.controller(CalculatorController.typeName, CalculatorController);
}