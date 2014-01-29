jasmine-jsonpath
================

A Plugin for Jasmine, to enable jsonpath(http://goessner.net/articles/JsonPath/) in matchers.

#### Installation

Download [jasmine-jsonpath](https://raw2.github.com/abruzzi/jasmine-jsonpath/master/lib/jasmine-jsonpath.js) from here and put it in your jasmine test runner file( typically it's your SpecRunner.html). 
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

[check this out](http://goessner.net/articles/JsonPath/) if you want to know all details about `jsonpath`

#### Matchers

And also there is a matcher(for now, and I'm going to add another one) `toHasJsonPath`:

```js
it("should be able to deteming a path is existing", function() {
    expect(obj).toHasJsonPath('$.languages[0].type');
    expect(obj).toHasJsonPath('$.languages[?(@.type=="Static")]');
});
```

additionally, there is another more powerful(useful) matcher `toHasSchema`, consider you have a object(request will be sent to server or response from server):

```js
{
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
```

and to make sure none didnt break it and none will break it in the futher, we need to write tests to ensure it:

```js
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
```

Then, if someone accidently made a `typo`, say, `languages` to `longuages`, the test will fail. You can make it more complex and more specified:

```js
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
```

And that's it.
