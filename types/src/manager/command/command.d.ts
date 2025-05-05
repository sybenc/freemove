export interface Command {
    record: boolean;
    undo: () => void;
    exec: () => void;
}
