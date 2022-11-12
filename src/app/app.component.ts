import { Component } from '@angular/core';
import { Vertex } from './interfaces/vertex.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    initVertexes: Vertex[] = [
        {
            vertexName: 'HOME',
            neighbours: [
                {
                    vertexName: 'A',
                    value: 5,
                    drawLine: true,
                },
                {
                    vertexName: 'D',
                    value: 8,
                    drawLine: true,
                },
            ],
        },
        {
            vertexName: 'A',
            neighbours: [
                {
                    vertexName: 'HOME',
                    value: 5,
                },
                {
                    vertexName: 'B',
                    value: 9,
                    drawLine: true,
                },
                {
                    vertexName: 'C',
                    value: 3,
                    drawLine: true,
                },
            ],
        },
        {
            vertexName: 'B',
            neighbours: [
                {
                    vertexName: 'A',
                    value: 9,
                },
                {
                    vertexName: 'C',
                    value: 5,
                },
                {
                    vertexName: 'OFFICE',
                    value: 7,
                    drawLine: true,
                },
            ],
        },
        {
            vertexName: 'C',
            neighbours: [
                {
                    vertexName: 'A',
                    value: 3,
                },
                {
                    vertexName: 'B',
                    value: 5,
                    drawLine: true,
                },
                {
                    vertexName: 'D',
                    value: 4,
                },
                {
                    vertexName: 'E',
                    value: 2,
                    drawLine: true,
                },
            ],
        },
        {
            vertexName: 'D',
            neighbours: [
                {
                    vertexName: 'HOME',
                    value: 8,
                },
                {
                    vertexName: 'C',
                    value: 4,
                    drawLine: true,
                },
                {
                    vertexName: 'E',
                    value: 6,
                    drawLine: true,
                },
            ],
        },
        {
            vertexName: 'E',
            neighbours: [
                {
                    vertexName: 'C',
                    value: 2,
                },
                {
                    vertexName: 'D',
                    value: 6,
                },
                {
                    vertexName: 'OFFICE',
                    value: 4,
                    drawLine: true,
                },
            ],
        },
        {
            vertexName: 'OFFICE',
            neighbours: [
                {
                    vertexName: 'B',
                    value: 7,
                },
                {
                    vertexName: 'E',
                    value: 4,
                },
            ],
        },
    ];
    vertexes: Vertex[];
    firstVertex: string;
    lastVertex: string;
    shortestPath: string[] = [];
    shortestPathRaw = '';
    distanceCount: number;

    generateVertexes(vertexName): Vertex[] {
        return this.initVertexes.map((v) => {
            return {
                ...v,
                distanceCount: v.vertexName === vertexName
                    ? 0
                    : Infinity,
                isChecked: false,
            };
        });
    }

    /* choose the first and the last vertex (choosing the last one triggers finding methods for distance count and path) */
    selectVertex(vertexName: string): void {
        if (this.firstVertex === vertexName && this.shortestPath.length === 0) {
            return;
        }

        if (this.firstVertex && !this.lastVertex) {
            this.lastVertex = vertexName;
            this.shortestPath = [this.lastVertex];
            this.findShortestDistance(this.vertexes);
            this.findShortestPath(this.vertexes);
            return;
        }

        this.firstVertex = vertexName;
        this.lastVertex = null;
        this.distanceCount = null;
        this.shortestPath = [];
        this.shortestPathRaw = '';

        /* set firstVertex distanceCount to 0 */
        this.vertexes = this.generateVertexes(this.firstVertex);
    }

    /* find the shortest distance count from start point */
    findShortestDistance(vertexes: Vertex[]): void {
        const vertex = vertexes
            .filter((v) => !v.isChecked)
            .sort((a, b) => a.distanceCount - b.distanceCount)[0];
        const { distanceCount, neighbours } = vertex;

        neighbours.forEach((n) => {
            const neighbourVertex = vertexes.find((v) => v.vertexName === n.vertexName);
            if (distanceCount + n.value < neighbourVertex.distanceCount) {
                neighbourVertex.distanceCount = distanceCount + n.value;
            }
        });

        vertex.isChecked = true;
        const allVertexesAreChecked = !vertexes.some((v) => !v.isChecked);

        if (allVertexesAreChecked) {
            return;
        }

        this.findShortestDistance(vertexes);
    }

    /* find the shortest path from one vertex to another in ['A', 'B', 'C'...] and 'ABC' formats */
    findShortestPath(vertexes: Vertex[]): void {
        const lastVertex = this.shortestPath[this.shortestPath.length - 1];
        const { neighbours } = vertexes.find((v) => v.vertexName === lastVertex);
        const shortestNeighbour = [...neighbours].sort((a, b) => {
            const neighbourA = vertexes.find((v) => v.vertexName === a.vertexName);
            const neighbourB = vertexes.find((v) => v.vertexName === b.vertexName);
            return (neighbourA.distanceCount + a.value) - (neighbourB.distanceCount + b.value);
        })[0];

        this.shortestPath.push(shortestNeighbour.vertexName);
        if (shortestNeighbour.vertexName === this.firstVertex) {
            this.distanceCount = vertexes.find((v) => v.vertexName === this.lastVertex).distanceCount;
            this.shortestPath = this.shortestPath.reverse();
            this.shortestPathRaw = this.shortestPath.join('');
            return;
        }
        this.findShortestPath(vertexes);
    }
}
