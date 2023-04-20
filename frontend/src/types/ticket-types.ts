export interface ITickets {
    tickets?: string[],
    loading?: boolean,
    message?: string,
    error?: string
}

export interface ISingleTicket {
    ticket?: object,
    message?: string,
    loading?: boolean,
    error?: string
}