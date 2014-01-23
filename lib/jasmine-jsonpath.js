(function (jasmine, jsonPath) {
    'use strict';
    jasmine.getNodeByPath = function(obj, path, arg) {
        return jsonPath(obj, path, arg);
    };

    beforeEach(function() {
        this.addMatchers({
            toHasJsonPath: function(path) {
                var actual = this.actual;
                var result = jsonPath(actual, path);

                this.message = function() {
                    return 'Expected '+ JSON.stringify(actual, null, 2) +' to has path ' + path;
                };

                return result || result === null;
            }
        });
    });

}(jasmine, jsonPath));
