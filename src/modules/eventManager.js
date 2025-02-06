export default class EventManager {
    constructor() {
        this.eventListeners = new Map();
    }

    handleEvent = (e) => {
        e.preventDefault()
        for (const [key, eventListener] of this.eventListeners) {
            const matchingElement = e.target.closest(eventListener.selector);
            
            if (matchingElement && e.type === eventListener.eventType) {
                eventListener.handler.call(this, matchingElement, e);
            }
        }
    }

    addListener(selector, eventType, handler) {
        const key = `${selector}|${eventType}`;
        
        this.eventListeners.set(key, {
            selector,
            eventType,
            handler
        });

        document.addEventListener(eventType, this.handleEvent, true);
    }

    removeListener(selector, eventType) {
        const key = `${selector}|${eventType}`;
        
        if (this.eventListeners.has(key)) {
            this.eventListeners.delete(key);
            
            // If no more listeners for this event type, remove document listener
            if (![...this.eventListeners.keys()].some(k => k.endsWith(`|${eventType}`))) {
                document.removeEventListener(eventType, this.handleEvent, true);
            }
        }
    }

    cleanup() {
        for (const eventListener of this.eventListeners.values()) {
            document.removeEventListener(eventListener.eventType, this.handleEvent, true);
        }
        this.eventListeners.clear();
    }
}