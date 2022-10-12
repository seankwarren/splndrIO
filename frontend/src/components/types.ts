
export interface CardType {
    "cost": string,
    "points": number,
    "id": string,
    "level": number,
    "color": number,
}

export interface NobleType {
    "cost": string,
    "points": number,
    "id": string,
}

export interface BoardType {
    "cards": CardType[],
    "nobles": NobleType[],
}

export interface DeckType {
    "level": number,
    "cards": CardType[]
}

export interface BankType {
    "gems": string,
}

export interface PlayerType {
    "deck": DeckType,
    "bank": BankType[],
    "nobles": NobleType,
    "name": string,
}

export interface GameType {
    "game_url": string,
    "game_name": string,
    "created_at": Date,
    "completed_at": Date,
    "num_players": number,
    "bank": BankType[],
    "players": PlayerType[],
    "decks": DeckType[],
    "board": BoardType[],
};
