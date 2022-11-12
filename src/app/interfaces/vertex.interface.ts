import { VertexNeighbour } from './vertex-neighbour.interface';

export interface Vertex {
    vertexName: string;
    neighbours: VertexNeighbour[];
    distanceCount?: number;
    isChecked?: boolean;
    shortestPath?: string[];
}
