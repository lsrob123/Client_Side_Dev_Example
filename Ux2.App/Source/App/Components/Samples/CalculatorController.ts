
module SampleComponents {
    import app = App;
    import constants = Constants;
    import sampleServices = SampleServices;

    export class CalculatorController {
        static $inject = ["$scope","$stateParams", constants.Service.CalculatorService];

        numberA: number;
        numberB: number;
        numberC: number;
        textD: string;

        constructor(private $scope: ng.IScope, private $stateParams: ng.ui.IStateParamsService, private calculatorService: sampleServices.CalculatorService) {
            this.textD = this.$stateParams[constants.RouteParameter.p1];

            if (!this.textD)
                this.textD = (new Date()).toDateString();

            let activeComponents = this.$stateParams[constants.RouteParameter.activeComponents];
        }

        add(): void {
            this.numberC = this.calculatorService.add(this.numberA, this.numberB);
        }
    }

    app.app.controller(constants.Controller.CalculatorController, CalculatorController);
}