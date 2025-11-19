export type WheelEntry = {
    id: string;
    name: string;
    weight: number;
    color: string;
    entryNumber: number;
}

export type SpinResult = {
    spinId: string;
    rotation: number;
    entries: WheelEntry[];
    winningEntry: WheelEntry;
}


class WheelService {
    private static instance: WheelService;
    private entries: WheelEntry[] = [];
    private listeners: (() => void)[] = [];

    private constructor() {

        this.initializeWithDefaultEntries();
    }

    private initializeWithDefaultEntries(): void {
        const defaultEntries = [
            { name: "Zsiguli", weight: 3, color: "#da2222ff" },
            { name: "Zsé", weight: 2, color: "#15ff00ff" },
            { name: "Zsarnok", weight: 4, color: "#e6d92eff" },
            { name: "Zsurnaliszt", weight: 1, color: "#4f6597" },
            { name: "Zsibbad", weight: 5, color: "#613b8c" }
        ];

        defaultEntries.forEach((d, index) => {
            const entry: WheelEntry = {
                id: index.toString() + "-" + Math.random().toString(36),
                name: d.name,
                weight: d.weight,
                color: d.color,
                entryNumber: this.entries.length
            };
            this.entries.push(entry);
        });
        this.notifyListeners();
    }

    public addListener(listener: () => void): void {
        this.listeners.push(listener);
    }

    public removeListener(listener: () => void): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    private notifyListeners(): void {
        this.listeners.forEach((nf) => nf());
    }


    public static getInstance(): WheelService {
        if (!WheelService.instance) {
            WheelService.instance = new WheelService();
        }
        return WheelService.instance;
    }

    private generateId(): string {
        return this.entries.length.toString() + "-" + (Math.random() * 10).toString(36);
    }

    private generateSpinId(): string {
        return Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 8);
    }

    public addEntryType(entry: WheelEntry): void {
        this.entries.push(entry);
        this.notifyListeners();
    }

    public addEntry(name: string, weight: number, color?: string): void {
        const entry: WheelEntry = {
            id: this.generateId(),
            name,
            weight,
            color,
            entryNumber: this.entries.length
        };
        this.entries.push(entry);
        this.notifyListeners();
    }

    public clearEntries(): void {
        this.entries = [];
        this.notifyListeners();
    }

    public getEntries(): WheelEntry[] {
        return this.entries;
    }

    public removeEntry(id: string): void {
        this.entries = this.entries.filter(e => e.id !== id);
        this.notifyListeners();
    }

    public removeWinnerEntry(id: string): void {
        this.entries = this.entries.filter(e => e.id !== id);
        this.entries.forEach((e, i) => e.entryNumber = i);
        this.notifyListeners();
    }

    editEntry(id: string, name?: string, weight?: number, color?: string): void {
        const index = this.entries.findIndex(e => e.id === id);
        if (index !== -1) {
            if (name !== undefined) this.entries[index].name = name;
            if (weight !== undefined) this.entries[index].weight = weight;
            if (color !== undefined) this.entries[index].color = color;
        }
        this.notifyListeners();
    }

    public spinWheel(removeWinner: boolean = false): SpinResult | null {
        if (this.entries.length === 0) return null;
        const totalWeight = this.entries.reduce((s, e) => s + e.weight, 0);
        if (totalWeight <= 0) return null;

        const spinTarget = Math.random() * totalWeight;
        const sorted = [...this.entries].sort((a, b) => a.entryNumber - b.entryNumber);

        let startWeight = 0;
        let winningEntry: WheelEntry | null = null;
        let winningDeg = 0;

        for (const entry of sorted) {
            const endWeight = startWeight + entry.weight;

            if (spinTarget >= startWeight && spinTarget < endWeight) {
                winningEntry = entry;

                winningDeg = (spinTarget / totalWeight) * 360;

                break;
            }
            startWeight = endWeight;
        }

        if (!winningEntry) {
            winningEntry = sorted[0];
        }

        const finalRotationDeg = 360 - winningDeg;

        const result: SpinResult = {
            spinId: this.generateSpinId(),
            rotation: finalRotationDeg,
            entries: [...sorted],
            winningEntry,
        };

        return result;
    }
}

export const wheelService = WheelService.getInstance();