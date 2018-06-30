import { StationConnection } from "./stationConnection";

export class Station {
    iata: string;
    latitude: number;
    longitude: number;
    shortName: string;
    connections: StationConnection[]
}