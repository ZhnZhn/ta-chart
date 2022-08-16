const _isTouchable = () => document
    && 'ontouchstart' in document.documentElement;

export const HAS_TOUCH = _isTouchable()
