import {read} from "../file_reader.js";

function solve(lines) {
  const nodes = [];

  for (const line of lines) {
    const [x, y, z] = line.split(",");
    nodes.push(
      new Node(
        Number.parseInt(x),
        Number.parseInt(y),
        Number.parseInt(z)
      )
    );
  }

  for (let i = 0; i < nodes.length; i++) {
    // const getSmallestIndex = getSmallestNodeIndex(nodes);
    calculateMinDistanceAndAddConnection(nodes, i);
  }

  nodes.sort((a, b) => {
    const aSize = a.getCircuitSize();
    const bSize = b.getCircuitSize();

    if (aSize > bSize) {
      return -1;
    }

    if (aSize < bSize) {
      return 1;
    }

    return 0;
  });

  console.log(nodes);

  // console.log(nodes[0].getCircuitSize())
  // console.log(nodes[1].getCircuitSize())
  // console.log(nodes[2].getCircuitSize())
  // console.log(nodes.map(x => x.connections));
  return nodes[0].getCircuitSize() * nodes[1].getCircuitSize() * nodes[2].getCircuitSize();
}

function getSmallestNodeIndex(nodes) {
  let smallestConnectionNotYetConnected = Infinity;
  let smallestNodeIndex;

  for (let i = 0; i < nodes.length; i++) {
    const minNode = calculateMinNode(nodes, i);
    if (nodes[i].hasConnectionTo(minNode)) {

    }
      // const currentDistance = nodes[i].getDistanceFrom(nodes[j]);

      // if (currentDistance < smallestConnectionNotYetConnected) {
      //   smallestConnectionNotYetConnected = currentDistance;
      // }
  }

  return smallestNodeIndex;
}

function calculateMinDistanceAndAddConnection(nodes, currentNodeIndex) {
  if (currentNodeIndex >= nodes.length) return false;

  const currentNode = nodes[currentNodeIndex];
  const minNode = calculateMinNode(nodes, currentNodeIndex);

  if (!currentNode.addConnection(minNode)) {
    return false;
  }

  return true;
}

function calculateMinNode(nodes, currentNodeIndex) {
  let minDistance = Infinity;
  let minNode;

  for (let i = 0; i < nodes.length; i++) {
    if (i === currentNodeIndex) continue;

    const currentDistance = nodes[currentNodeIndex].getDistanceFrom(nodes[i]);

    if (currentDistance < minDistance) {
      minDistance = currentDistance;
      minNode = nodes[i];
    }
  }

  return minNode;
}

class Node {
  x;
  y;
  z;
  connections;

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.connections = new Map();
  }


  getCircuitSize(visited = new Set()) {
    let size = 1;

    for (const key of this.connections.keys()) {
      size += this.#calculateSize(visited, key);
    }

    return size;
  }

  #calculateSize(visited, key) {
    if (visited.has(key)) return 0;

    let size = 1;
    for (const neighbor of this.connections.get(key).connections.keys()) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        size += this.#calculateSize(visited, neighbor);
      }
    }

    return size;
  }

  getNumberOfConnections() {
    return this.connections.size;
  }

  addConnection(otherNode) {
    const id = `${otherNode.x} ${otherNode.y} ${otherNode.z}`;

    if (this.connections.has(id)) {
      return false;
    }

    this.connections.set(id, otherNode);
    otherNode.addConnection(this);

    return true;
  }

  hasConnectionTo(otherNode) {
    return this.#hasConnectionTo(this, otherNode);
  }

  #hasConnectionTo(src, dst, visited = new Set()) {
    const id = `${dst.x} ${dst.y} ${dst.z}`;

    if (this.connections.has(id)) return true;
    if (visited.has(key)) return false;

    for (const neighbor of src.connections.keys()) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);

        if (this.#hasConnectionTo(neighbor, otherNode, visited)) {
          return true;
        }
      }
    }

    return false;
  }

  // #findNode(src, dst, visited) {
  //   const id = `${dst.x} ${dst.y} ${dst.z}`;

  //   if (visited.has(id)) return;
  //   if (src.connections.has(id)) return src.connections.get(id);

  //   for (const neighbor of src.keys()) {
  //     if (!visited.has(neighbor)) {
  //       visited.add(neighbor);
  //       const node = this.#findNode(neighbor, otherNode);

  //       if (node !== undefined) return node;
  //     }
  //   }
  // }

  getDistanceFrom(otherNode) {
    const x = this.#calculateDistanceBetweenTwoPoints(this.x, otherNode.x);
    const y = this.#calculateDistanceBetweenTwoPoints(this.y, otherNode.y);
    const z = this.#calculateDistanceBetweenTwoPoints(this.z, otherNode.z);

    return Math.pow(x + y + z, 0.5);
  }

  #calculateDistanceBetweenTwoPoints(p, q) {
    return Math.pow(p - q, 2);
  }
}

read("./example.txt", solve);
// read("./input.txt", solve);
