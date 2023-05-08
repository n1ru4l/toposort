import { toposort as batchingToposort, toposortReverse } from "./toposort.js";

describe("toposort", () => {
  it("toposorts an empty graph", () => {
    expect(batchingToposort(new Map())).toEqual([]);
  });

  it("toposorts a simple DAG", () => {
    expect(
      batchingToposort(
        new Map([
          ["a", ["b"]],
          ["b", ["c"]],
          ["c", []],
        ])
      )
    ).toEqual([new Set(["a"]), new Set(["b"]), new Set(["c"])]);
  });

  it("toposorts a richer DAG", () => {
    expect(
      batchingToposort(
        new Map([
          ["a", ["c"]],
          ["b", ["c"]],
          ["c", []],
        ])
      )
    ).toEqual([new Set(["a", "b"]), new Set(["c"])]);
  });

  it("toposorts a complex DAG", () => {
    expect(
      batchingToposort(
        new Map([
          ["a", ["c", "f"]],
          ["b", ["d", "e"]],
          ["c", ["f"]],
          ["d", ["f", "g"]],
          ["e", ["h"]],
          ["f", ["i"]],
          ["g", ["j"]],
          ["h", ["j"]],
          ["i", []],
          ["j", []],
        ])
      )
    ).toEqual([
      new Set(["a", "b"]),
      new Set(["c", "d", "e"]),
      new Set(["f", "g", "h"]),
      new Set(["i", "j"]),
    ]);
  });

  it("errors on a small cyclic graph", () => {
    const dg = new Map([
      ["a", ["b"]],
      ["b", ["a"]],
      ["c", []],
    ]);
    const sortCyclicGraph = () => {
      batchingToposort(dg);
    };
    expect(sortCyclicGraph).toThrowError(Error);
  });

  it("errors on a larger cyclic graph", () => {
    const dg = new Map([
      ["a", ["b", "c"]],
      ["b", ["c"]],
      ["c", ["d", "e"]],
      ["d", ["b"]],
      ["e", []],
    ]);
    const sortCyclicGraph = () => {
      batchingToposort(dg);
    };
    expect(sortCyclicGraph).toThrowError(Error);
  });
});

describe("toposortReverse", () => {
  it("can sort stuff", () => {
    const graph = new Map([
      ["floss", ["brushTeeth"]],
      ["drinkCoffee", ["wakeUp"]],
      ["wakeUp", []],
      ["brushTeeth", ["drinkCoffee", "eatBreakfast"]],
      ["eatBreakfast", ["wakeUp"]],
    ]);
    const result = toposortReverse(graph);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Set {
          "wakeUp",
        },
        Set {
          "drinkCoffee",
          "eatBreakfast",
        },
        Set {
          "brushTeeth",
        },
        Set {
          "floss",
        },
      ]
    `);
  });
});
