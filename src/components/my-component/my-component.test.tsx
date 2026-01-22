import { render, h, describe, expect, it } from '@stencil/vitest';

describe('my-component (browser)', () => {
  describe('rendering', () => {
    it('renders with shadow root', async () => {
      const { root } = await render(<my-component></my-component>);
      expect(root).toHaveShadowRoot();
    });

    it('renders collapsed greeting by default', async () => {
      const { root } = await render(<my-component first="John"></my-component>);
      const greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent('Hello, John!');
    });

    it('renders Anonymous when no name provided', async () => {
      const { root, waitForChanges } = await render(<my-component></my-component>);
      const toggleBtn = root.shadowRoot.querySelector('.toggle-btn') as HTMLButtonElement;
      toggleBtn.click();
      await waitForChanges();
      const greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent("I'm Anonymous");
    });

    it('renders full name when all props provided', async () => {
      const { root } = await render(<my-component first="John" middle="Q" last="Doe"></my-component>);
      const greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent('Hello, John Q Doe!');
    });
  });

  describe('counter functionality', () => {
    it('starts at zero', async () => {
      const { root } = await render(<my-component></my-component>);
      const count = root.shadowRoot.querySelector('.count');
      expect(count).toHaveTextContent('0 clicks');
    });

    it('increments when + button clicked', async () => {
      const { root, waitForChanges } = await render(<my-component></my-component>);
      const incrementBtn = root.shadowRoot.querySelector('.increment-btn') as HTMLButtonElement;
      incrementBtn.click();
      await waitForChanges();
      const count = root.shadowRoot.querySelector('.count');
      expect(count).toHaveTextContent('1 click');
    });

    it('decrements when - button clicked', async () => {
      const { root, waitForChanges } = await render(<my-component></my-component>);
      const incrementBtn = root.shadowRoot.querySelector('.increment-btn') as HTMLButtonElement;
      const decrementBtn = root.shadowRoot.querySelector('.decrement-btn') as HTMLButtonElement;

      incrementBtn.click();
      incrementBtn.click();
      await waitForChanges();

      decrementBtn.click();
      await waitForChanges();

      const count = root.shadowRoot.querySelector('.count');
      expect(count).toHaveTextContent('1 click');
    });

    it('respects max limit', async () => {
      const { root, waitForChanges } = await render(<my-component max={2}></my-component>);
      const incrementBtn = root.shadowRoot.querySelector('.increment-btn') as HTMLButtonElement;

      incrementBtn.click();
      incrementBtn.click();
      incrementBtn.click();
      await waitForChanges();

      const count = root.shadowRoot.querySelector('.count');
      expect(count).toHaveTextContent('2 clicks');
      expect(incrementBtn).toHaveAttribute('disabled');
    });

    it('respects min limit', async () => {
      const { root } = await render(<my-component min={0}></my-component>);
      const decrementBtn = root.shadowRoot.querySelector('.decrement-btn') as HTMLButtonElement;
      expect(decrementBtn).toHaveAttribute('disabled');
    });

    it('uses correct pluralization for 1 click', async () => {
      const { root, waitForChanges } = await render(<my-component></my-component>);
      const incrementBtn = root.shadowRoot.querySelector('.increment-btn') as HTMLButtonElement;
      incrementBtn.click();
      await waitForChanges();
      const count = root.shadowRoot.querySelector('.count');
      expect(count).toHaveTextContent('1 click');
    });
  });

  describe('toggle functionality', () => {
    it('expands greeting when toggle clicked', async () => {
      const { root, waitForChanges } = await render(<my-component first="Jane"></my-component>);
      const toggleBtn = root.shadowRoot.querySelector('.toggle-btn') as HTMLButtonElement;

      expect(toggleBtn).toHaveTextContent('Expand');
      toggleBtn.click();
      await waitForChanges();

      expect(toggleBtn).toHaveTextContent('Collapse');
      const greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent('Nice to meet you!');
    });

    it('collapses greeting when toggle clicked twice', async () => {
      const { root, waitForChanges } = await render(<my-component first="Jane"></my-component>);
      const toggleBtn = root.shadowRoot.querySelector('.toggle-btn') as HTMLButtonElement;

      toggleBtn.click();
      await waitForChanges();
      toggleBtn.click();
      await waitForChanges();

      expect(toggleBtn).toHaveTextContent('Expand');
    });
  });

  describe('events', () => {
    it('emits countChanged when incremented', async () => {
      const { root, spyOnEvent, waitForChanges } = await render(<my-component></my-component>);
      const spy = spyOnEvent('countChanged');
      const incrementBtn = root.shadowRoot.querySelector('.increment-btn') as HTMLButtonElement;

      incrementBtn.click();
      await waitForChanges();

      expect(spy).toHaveReceivedEvent();
      expect(spy).toHaveReceivedEventDetail(1);
    });

    it('emits countChanged when decremented', async () => {
      const { root, spyOnEvent, waitForChanges } = await render(<my-component></my-component>);
      const spy = spyOnEvent('countChanged');
      const incrementBtn = root.shadowRoot.querySelector('.increment-btn') as HTMLButtonElement;
      const decrementBtn = root.shadowRoot.querySelector('.decrement-btn') as HTMLButtonElement;

      incrementBtn.click();
      await waitForChanges();

      decrementBtn.click();
      await waitForChanges();

      expect(spy).toHaveReceivedEventTimes(2);
    });

    it('emits greetingToggled when expanded', async () => {
      const { root, spyOnEvent, waitForChanges } = await render(<my-component></my-component>);
      const spy = spyOnEvent('greetingToggled');
      const toggleBtn = root.shadowRoot.querySelector('.toggle-btn') as HTMLButtonElement;

      toggleBtn.click();
      await waitForChanges();

      expect(spy).toHaveReceivedEvent();
      expect(spy).toHaveReceivedEventDetail(true);
    });
  });
});
