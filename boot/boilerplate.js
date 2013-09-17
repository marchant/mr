(function (modules) {

    // unpack module tuples into module objects
    for (var i = 0; i < modules.length; i++) {
        modules[i] = new Module(modules[i][0], modules[i][1]);
    }

    function Module(dependencies, factory) {
        this.dependencies = dependencies;
        this.factory = factory;
    }

    Module.prototype.getExports = function () {
        var module = this;
        if (!module.exports) {
            module.exports = {};
            function require(id) {
                var index = module.dependencies[id];
                var dependency = modules[index];
                if (!dependency)
                    throw new Error("Bundle is missing a dependency: " + id);
                return dependency.getExports();
            }
            module.exports = module.factory(require, module.exports, module) || module.exports;
        }
        return module.exports;
    };

    return modules[0].getExports();
})