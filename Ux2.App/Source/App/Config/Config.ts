module Config {
    import app = App;

    export class ConfigService {
        static typeName = "ConfigService";

        static $inject = ["$q"];

        constructor($q: ng.IQService) {
        }

    }

    app.app.service(ConfigService.typeName, ConfigService);

}