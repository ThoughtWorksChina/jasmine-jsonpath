describe("jasmine jsonpath", function() {
    var obj;
    beforeEach(function() {
        obj = {
            languages: [
                {
                    type: "Dynamic",
                    samples: ["Ruby", "Python"]
                },
                {
                    type: "Static",
                    samples: ["Java", "C"]
                },
                {
                    type: "Dynamic",
                    samples: ["JavaScript"]
                }
            ],
            tools: {
                category: {
                    name: "Common"
                }
            }
        };
    });

    it("should be able to get object by path", function() {
        var dynamic = jasmine.getNodeByPath(obj, '$.languages[?(@.type=="Dynamic")]');
        expect(dynamic[0].samples.length).toEqual(2);
        expect(dynamic[1].samples.length).toEqual(1);
    });

    it("should be able to deteming a path is existing", function() {
        expect(obj).toHasJsonPath('$.languages[0].type');
        expect(obj).toHasJsonPath('$.languages[?(@.type=="Static")]');
    });

    it("should be able to tell an object has a special schema", function() {
        var schema = {
            languages: [
                {
                    type: "Static",
                    samples: []
                }
            ]
        };

        expect(obj).toHasSchema(schema);
    });

    it("should be able to tell an object has a special schema, more complex", function() {
        var schema = {
            languages: [],
            tools: {
                category: {
                    name: "Common"
                }
            }
        };

        expect(obj).toHasSchema(schema);
    });
});

