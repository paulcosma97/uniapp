export interface Action<Type = string, Payload = void> {
    type: Type;
    payload: Payload;
}

type ActionGenerics<ExtendedAction> = ExtendedAction extends Action<infer T, infer P> ? [T, P] : never;
type ActionType<ExtendedAction> = ActionGenerics<ExtendedAction>[0];
type ActionPayload<ExtendedAction> = ActionGenerics<ExtendedAction>[1];

export const makeAction =
    <ExtendedAction extends Action<string, any>,
        Type = ActionType<ExtendedAction>,
        Payload = ActionPayload<ExtendedAction>>
            (type: Type) => (payload: Payload): Action<Type, Payload> => ({ type, payload });