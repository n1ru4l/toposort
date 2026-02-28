import rewire from "rewire"
const toposort = rewire("./toposort")
const countInDegrees = toposort.__get__("countInDegrees")
const getRootsAndNonRoots = toposort.__get__("getRootsAndNonRoots")
const reverse = toposort.__get__("reverse")
// @ponicode
describe("toposort.toposort", () => {
    test("0", () => {
        let callFunction: any = () => {
            toposort.toposort({ size: 80 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            toposort.toposort({ size: 4 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            toposort.toposort({ size: 32 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            toposort.toposort({ size: 2 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            toposort.toposort({ size: 256 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            toposort.toposort({ size: NaN })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("countInDegrees", () => {
    test("0", () => {
        let callFunction: any = () => {
            countInDegrees({ size: 4 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            countInDegrees({ size: 1 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            countInDegrees({ size: 10 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            countInDegrees({ size: 11 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            countInDegrees({ size: 2 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            countInDegrees({ size: Infinity })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getRootsAndNonRoots", () => {
    test("0", () => {
        let callFunction: any = () => {
            getRootsAndNonRoots({ size: 1000 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            getRootsAndNonRoots({ size: 1 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            getRootsAndNonRoots({ size: 10 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            getRootsAndNonRoots({ size: 80 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            getRootsAndNonRoots({ size: 128 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            getRootsAndNonRoots({ size: NaN })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("reverse", () => {
    test("0", () => {
        let callFunction: any = () => {
            reverse({ size: 32 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            reverse({ size: 1000 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            reverse({ size: 10 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            reverse({ size: 16 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            reverse({ size: 4 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            reverse({ size: Infinity })
        }
    
        expect(callFunction).not.toThrow()
    })
})
