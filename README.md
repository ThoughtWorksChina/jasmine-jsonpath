jasmine-jsonpath
================

A Plugin for Jasmine, to enable jsonpath(http://goessner.net/articles/JsonPath/) in matchers.

#### Installation

Download [jasmine-jsonpath](https://github.com/abruzzi/jasmine-jsonpath/lib/jasmine-jsonpath.js) from here and put it in your jasmine test runner file( typically it's your SpecRunner.html). 
And you need [jsonpath](https://code.google.com/p/json-path/) and [json2](https://github.com/douglascrockford/JSON-js) as well.

#### Methods

Let's say we have an object like this:

```js
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
```

Then we want to get one special node by jsonpath:

```js
it("should be able to get object by path", function() {
    var dynamic = jasmine.getNodeByPath(obj, '$.languages[?(@.type=="Dynamic")]');
    expect(dynamic[0].samples.length).toEqual(2);
    expect(dynamic[1].samples.length).toEqual(1);
});
```

[check this out]() if you want to know all details about `jsonpath`

#### Matchers

And also there is a matcher(for now, and I'm going to add another one)

```js
it("should be able to deteming a path is existing", function() {
    expect(obj).toHasJsonPath('$.languages[0].type');
    expect(obj).toHasJsonPath('$.languages[?(@.type=="Static")]');
});
```

