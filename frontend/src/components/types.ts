export interface CardType {
    cost: string;
    points: number;
    id: string;
    level: number;
    color: number;
}

export interface NobleType {
    cost: string;
    points: number;
    id: string;
}

export interface BoardType {
    cards: CardType[];
    nobles: NobleType[];
}

export interface DeckType {
    level: number;
    cards: CardType[];
    id: string;
}

export interface BankType {
    gems: string;
}

export interface PlayerType {
    id: string;
    deck: DeckType[];
    bank: BankType[];
    nobles: NobleType;
    name: string;
    turn: number;
}

export interface GameType {
    game_url: string;
    game_name: string;
    created_at: Date;
    completed_at: Date;
    num_players: number;
    current_player: PlayerType[];
    bank: BankType[];
    players: PlayerType[];
    decks: DeckType[];
    board: BoardType[];
}

export interface MoveType {
    gemsToDraw: string;
    cardToPurchase: string;
    cardToReserve: string;
}
