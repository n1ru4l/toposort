export type DirectedAcyclicGraph = Map<string, Iterable<string>>;
export type DependencyGraph = DirectedAcyclicGraph;

export type TaskList = Array<Set<string>>;

export const toposort = (dag: DirectedAcyclicGraph): TaskList => {
  const inDegrees = countInDegrees(dag);

  let { roots, nonRoots } = getRootsAndNonRoots(inDegrees);

  const sorted: TaskList = [];

  while (roots.size) {
    sorted.push(roots);

    const newRoots = new Set<string>();
    for (const root of roots) {
      for (const dependent of dag.get(root)!) {
        inDegrees.set(dependent, inDegrees.get(dependent)! - 1);
        if (inDegrees.get(dependent) === 0) {
          newRoots.add(dependent);
        }
      }
    }

    roots = newRoots;
  }
  nonRoots = getRootsAndNonRoots(inDegrees).nonRoots;

  if (nonRoots.size) {
    throw Error("Cycle(s) detected; toposort only works on acyclic graphs");
  }

  return sorted;
};

export const toposortReverse = (deps: DependencyGraph): TaskList => {
  const dag = reverse(deps);
  return toposort(dag);
};

type InDegrees = Map<string, number>;

const countInDegrees = (dag: DirectedAcyclicGraph): InDegrees => {
  const counts: InDegrees = new Map();

  for (const [vx, dependents] of dag.entries()) {
    counts.set(vx, counts.get(vx) ?? 0);
    for (const dependent of dependents) {
      counts.set(dependent, (counts.get(dependent) ?? 0) + 1);
    }
  }

  return counts;
};

const getRootsAndNonRoots = (counts: InDegrees) => {
  const roots = new Set<string>();
  const nonRoots = new Set<string>();
  for (const [id, deg] of counts.entries()) {
    if (deg === 0) {
      roots.add(id);
    } else if (deg !== 0) {
      nonRoots.add(id);
    }
  }
  return { roots, nonRoots };
};

const reverse = (deps: DirectedAcyclicGraph): DependencyGraph => {
  const reversedDeps: Map<string, Set<string>> = new Map();

  for (const [name, dependsOn] of deps.entries()) {
    let set = reversedDeps.get(name);
    if (set === undefined) {
      set = new Set();
      reversedDeps.set(name, set);
    }

    for (const dependsOnName of dependsOn) {
      let set = reversedDeps.get(dependsOnName);
      if (set === undefined) {
        set = new Set<string>();
        reversedDeps.set(dependsOnName, set);
      }
      set.add(name);
    }
  }

  return reversedDeps;
};
