import { create } from 'zustand';  


interface StoreState {
  coordinates: { lat: number; lon: number };
  setCoordinates: (lat: number, lon: number) => void;
  trafficIncidents: TrafficIncident[];
  setTrafficIncidents: (incidents: TrafficIncident[]) => void;
}


interface TrafficIncident {
  description: string;
  severity: string;
  location: string;
  timestamp: string;
}


const useStore = create<StoreState>((set) => ({
  coordinates: { lat: 0, lon: 0 },
  setCoordinates: (lat: number, lon: number): void =>
    set(() => ({ coordinates: { lat, lon } })), 
  trafficIncidents: [],
  setTrafficIncidents: (incidents: TrafficIncident[]): void =>
    set(() => ({ trafficIncidents: incidents })), 
}));

export default useStore;
