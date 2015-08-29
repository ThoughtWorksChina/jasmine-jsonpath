(function (jasmine, jsonPath) {
    'use strict';

    jasmine.getNodeByPath = function(obj, path, arg) {
        return jsonPath(obj, path, arg);
    };

    function isSimpleObject(obj) {
        if(_.isObject(obj)) {
            return Object.keys(obj).length === 0;
        }
        return true;
    }

    function buildJsonPathByExample(obj) {
        var paths = [];
        return _buildJsonPathByExample(obj, "", paths);
    }

    var JSON_PATH_ROOT = "$";
    function _buildJsonPathByExample(obj, path, paths) {
        if (isSimpleObject(obj)) {
            paths.push(JSON_PATH_ROOT + path);
        } else {
            if(_.isArray(obj)) {
                _.each(obj, function(item) {
                    _buildJsonPathByExample(item, path+"[*]", paths);
                });
            } else {
                var array = [];
                var keys = Object.keys(obj);
                for (var keyIndex in keys) {
                    array[keyIndex] = path;
                    array[keyIndex] = array[keyIndex] + "." + keys[keyIndex];
                    _buildJsonPathByExample(obj[keys[keyIndex]], array[keyIndex], paths);
                }
            }
        }

        return paths;
    }

    beforeEach(function() {
        this.addMatchers({
            toHasJsonPath: function(path) {
                var actual = this.actual;
                var result = jsonPath(actual, path);

                this.message = function() {
                    return 'Expected '+ JSON.stringify(actual, null, 2) +' to has path ' + path;
                };

                return result || result === null;
            },
            toHasSchema: function(schema) {
                var actual = this.actual;
                var paths = buildJsonPathByExample(schema);
                var result = null;

                for(var i = 0, len = paths.length; i < len; i++) {
                    result = jsonPath(actual, paths[i]);
                    if(!result) {
                        return false;
                    }
                }

                this.message = function() {
                    return 'Expected '+ JSON.stringify(actual, null, 2) +
                        ' to has path ' + JSON.stringify(schema, null, 2);
                };

                return true;
            }
        });
    });

}(jasmine, jsonPath));
