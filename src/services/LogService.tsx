import { WheelEntry } from './WheelServices'; 

export interface LogEntry {
  id: string;
  winnerName: string;
  timestamp: number;
  eliminated: boolean;
  entriesAtSpin: WheelEntry[]; 
}
const STORAGE_KEY = 'wheelSpinLogs';

type LogUpdateListener = () => void;

class LogService {

    private listeners: LogUpdateListener[] = [];
    
    private notifyListeners(): void {
        this.listeners.forEach(listener => listener());
    }

    public addListener(listener: LogUpdateListener): void {
        this.listeners.push(listener);
    }

    public removeListener(listener: LogUpdateListener): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    public loadLogs(): LogEntry[] {
        if (typeof window === 'undefined') {
            return [];
        }
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? (JSON.parse(raw) as LogEntry[]) : [];
        } catch (error) {
            console.error("A logok nemszeretnek minket:", error);
            return [];
        }
    }

    private saveAllLogs(logs: LogEntry[]): void {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
        } catch (error) {
            console.error("Már menteni se tudunk:", error);
        }
    }

    public addLog(winnerName: string, eliminated: boolean, entriesAtSpin: WheelEntry[]): LogEntry {
        const newLog: LogEntry = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9), 
            winnerName,
            timestamp: Date.now(),
            eliminated,
            entriesAtSpin, 
        };

        const currentLogs = this.loadLogs();
        currentLogs.unshift(newLog); 

        this.saveAllLogs(currentLogs);
        
        this.notifyListeners(); 

        return newLog;
    }

    public clearLogs(): void {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(STORAGE_KEY);
            this.notifyListeners(); 
        } catch (error) {
            console.error("Ragaszkodik a logokhoz:", error);
        }
    }
}

export const logService = new LogService();