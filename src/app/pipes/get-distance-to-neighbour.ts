import { Pipe, PipeTransform } from '@angular/core';
import { Vertex } from '../interfaces/vertex.interface';

@Pipe({
    name: 'getDistanceToNeighbour',
})
export class GetDistanceToNeighbour implements PipeTransform {
    transform(vertexes: Vertex[], vertexName: string, vertexNeighbourName: string): number {
        return vertexes.find((v) => v.vertexName === vertexName)
            ?.neighbours.find((n) => n.vertexName === vertexNeighbourName)
            ?.value;
    }
}
