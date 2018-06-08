import * as Peekaboo from '../../src/js/peekaboo/peekaboo';

afterEach(() => {
  jest.restoreAllMocks();
  Peekaboo.reset();
});

const handlersCount = Peekaboo.EVENT_HANDLERS.length;

describe('start', () => {
  test('queries DOM for elements with attribute.', () => {
    const spy = jest.spyOn(document, 'querySelectorAll');

    Peekaboo.start();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('[data-anim-name]');
  });

  test('adds event listeners for scroll & resize events.', () => {
    const spy = jest.spyOn(window, 'addEventListener');

    Peekaboo.start();
    expect(spy).toHaveBeenCalledTimes(handlersCount);

    spy.mock.calls.forEach((call, index) => {
      const eventType = Peekaboo.EVENT_HANDLERS[index].event;
      const eventCallback = Peekaboo.EVENT_HANDLERS[index].handler;

      expect(call).toHaveLength(2);
      expect(call[0]).toBe(eventType);
      expect(call[1]).toBe(eventCallback);
    });
  });

  test('creates an interval for debouncing scroll events.', () => {
    const spy = jest.spyOn(window, 'setInterval');

    Peekaboo.start();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.any(Function), 50);
  });

  test('cannot not be called multiple times without calling reset.', () => {
    const intervalSpy = jest.spyOn(window, 'setInterval');
    const listenerSpy = jest.spyOn(window, 'addEventListener');

    Peekaboo.start();
    Peekaboo.start();
    expect(listenerSpy).toHaveBeenCalledTimes(handlersCount);
    expect(intervalSpy).toHaveBeenCalledTimes(1);

    Peekaboo.reset();
    Peekaboo.start();
    expect(listenerSpy)
      .toHaveBeenCalledTimes(handlersCount * 2);
    expect(intervalSpy)
      .toHaveBeenCalledTimes(2);
  });
});

describe('setScrolled', () => {
  test('sets scrolled to true', () => {
    expect(Peekaboo.isScrolled()).toBe(false);
    Peekaboo.setScrolled();
    expect(Peekaboo.isScrolled()).toBe(true);
  });
});

describe('reset', () => {
  test('clears existing intervals', () => {
    const clearSpy = jest.spyOn(window, 'clearInterval');
    const setSpy = jest.spyOn(window, 'setInterval');
    Peekaboo.start();
    Peekaboo.reset();

    expect(clearSpy).toHaveBeenCalled();
    expect(setSpy).toHaveBeenCalled();
    expect(Peekaboo.getInterval()).toBe(null);
  });

  test('clears existing eventListeners', () => {
    const spy = jest.spyOn(window, 'removeEventListener');
    Peekaboo.start();
    Peekaboo.reset();

    expect(spy).toHaveBeenCalledTimes(handlersCount);
    spy.mock.calls.forEach((call, index) => {
      const eventType = Peekaboo.EVENT_HANDLERS[index].event;
      const eventCallback = Peekaboo.EVENT_HANDLERS[index].handler;

      expect(call).toHaveLength(2);
      expect(call[0]).toBe(eventType);
      expect(call[1]).toBe(eventCallback);
    });
  });

  test('cannot not be called multiple times without calling start.', () => {
    const spy = jest.spyOn(window, 'removeEventListener');
    Peekaboo.start();
    Peekaboo.reset();
    Peekaboo.reset();

    expect(spy).toHaveBeenCalledTimes(handlersCount);
    spy.mock.calls.forEach((call, index) => {
      const eventType = Peekaboo.EVENT_HANDLERS[index].event;
      const eventCallback = Peekaboo.EVENT_HANDLERS[index].handler;

      expect(call).toHaveLength(2);
      expect(call[0]).toBe(eventType);
      expect(call[1]).toBe(eventCallback);
    });
  });
});
