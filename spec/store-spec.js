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
            ]
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
});

