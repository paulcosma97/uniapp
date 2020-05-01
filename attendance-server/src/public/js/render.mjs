const app = document.querySelector('#app');
let templateBuilder;

export async function render(templateFn) {
    app.innerHTML = await templateFn();
    templateBuilder = templateFn;
}

export async function triggerRender() {
    await render(templateBuilder);
}

export const makeComponent = (smartComponentFn, initialState = null) => {
    let state = initialState;
    const setState = (newState, rerender = true) => {
        if (typeof newState === 'function') {
            state = newState(state);
        } else {
            state = newState;
        }

        if (rerender) {
            triggerRender();
        }
    };

    let firstCall = true;

    const onInit = cb => {
       if (!firstCall) {
           return;
       }

       firstCall = false;
       cb();
    };

    return () => {
        return smartComponentFn({ state, setState, onInit });
    };
};