module Routes {
    import app = App;
    import constants = Constants;

    function configRoutes($stateProvider, $urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider
            .state('state11', {
                url: '/s/:' + constants.RouteParameter.p1 + '?',
                views: {
                    'view1': {
                        templateUrl: 'App/Components/Samples/Calculator.html',
                        controller: constants.Controller.CalculatorController
                    }
                },
                params: { activeComponents: [{ view: 'view1', controller: constants.Controller.CalculatorController}]}
            })
            .state('state1', {
                url: '/s',
                views: {
                    'view1': {
                        templateUrl: 'App/Components/Samples/Calculator.html',
                        controller: constants.Controller.CalculatorController
                    }
                },
                params: { activeComponents: [{ view: 'view1', controller: constants.Controller.CalculatorController }] }
            })
            ;
    }

    app.app.config(["$stateProvider", "$urlMatcherFactoryProvider", configRoutes]);
}