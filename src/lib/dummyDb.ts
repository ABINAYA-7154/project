import { BusData, Student, Management, Notification, CarbonData } from '../types';

// In-memory data store
class DummyDatabase {
  private buses: Map<string, BusData> = new Map();
  private students: Map<string, Student> = new Map();
  private management: Map<string, Management> = new Map();
  private notifications: Notification[] = [];
  private carbonData: Map<string, CarbonData> = new Map();
  private subscribers: Map<string, Set<(data: any) => void>> = new Map();

  constructor() {
    // Initialize with some dummy data
    this.initializeDummyData();
    // Start real-time updates simulation
    this.startSimulation();
  }

  private initializeDummyData() {
    // Initialize buses
    for (let i = 1; i <= 45; i++) {
      const busNumber = i.toString();
      this.buses.set(busNumber, {
        busNumber,
        location: { lat: 40.7128 + (Math.random() - 0.5) * 0.1, lng: -74.0060 + (Math.random() - 0.5) * 0.1 },
        estimatedArrival: new Date(Date.now() + Math.random() * 3600000).toLocaleTimeString()
      });
    }

    // Initialize carbon data
    this.carbonData.set('today', {
      todayReduction: 127.5,
      treesEquivalent: 12,
      lastMonthReduction: 3842.8
    });

    // Initialize some notifications
    this.notifications = [
      {
        id: '1',
        type: 'speed',
        message: 'ALERT: Bus 4 exceeded speed limit (75 km/h in 60 km/h zone)',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'fuel',
        message: 'Bus 2 fuel level at 15% - Refuel required',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString()
      }
    ];
  }

  private startSimulation() {
    // Simulate real-time bus updates
    setInterval(() => {
      this.buses.forEach((bus, busNumber) => {
        const updatedBus = {
          ...bus,
          location: {
            lat: bus.location.lat + (Math.random() - 0.5) * 0.001,
            lng: bus.location.lng + (Math.random() - 0.5) * 0.001
          },
          estimatedArrival: new Date(Date.now() + Math.random() * 3600000).toLocaleTimeString()
        };
        this.buses.set(busNumber, updatedBus);
        this.notifySubscribers('bus-' + busNumber, updatedBus);
      });
    }, 5000);

    // Simulate new notifications
    setInterval(() => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'speed' : 'fuel',
        message: `Bus ${Math.floor(Math.random() * 45) + 1} ${Math.random() > 0.5 ? 'speed alert' : 'fuel low'}`,
        timestamp: new Date().toISOString()
      };
      this.notifications.unshift(notification);
      this.notifySubscribers('notifications', notification);
    }, 30000);

    // Update carbon footprint data
    setInterval(() => {
      const currentData = this.carbonData.get('today')!;
      const updatedData = {
        ...currentData,
        todayReduction: currentData.todayReduction + Math.random() * 0.5,
        treesEquivalent: Math.floor(currentData.treesEquivalent + Math.random())
      };
      this.carbonData.set('today', updatedData);
      this.notifySubscribers('carbon', updatedData);
    }, 60000);
  }

  // Subscription methods
  subscribe(channel: string, callback: (data: any) => void) {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, new Set());
    }
    this.subscribers.get(channel)!.add(callback);
    return () => this.subscribers.get(channel)!.delete(callback);
  }

  private notifySubscribers(channel: string, data: any) {
    this.subscribers.get(channel)?.forEach(callback => callback(data));
  }

  // Data access methods
  getBusData(busNumber: string): BusData | null {
    return this.buses.get(busNumber) || null;
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  getCarbonData(): CarbonData {
    return this.carbonData.get('today')!;
  }

  // Auth methods
  async login(type: 'student' | 'management', data: any): Promise<boolean> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

// Export singleton instance
export const dummyDb = new DummyDatabase();