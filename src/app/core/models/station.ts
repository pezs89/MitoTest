import { StationConnection } from "./connection";

export class Station {
    iata: string;
    latitude: number;
    longitude: number;
    shortName: string;
    connections: StationConnection[]
}