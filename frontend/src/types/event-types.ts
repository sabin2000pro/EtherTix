export interface IEventState {
    loading?: boolean,
    error?: string,
    events?: []
}

export interface ISingleEventState {
    loading?: boolean,
    error?: string,
    event?: {}
}