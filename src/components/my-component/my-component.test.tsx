import { render, h, describe, expect, it } from '@stencil/vitest';

describe('my-component (browser)', () => {
  it('renders with shadow root', async () => {
    const { root } = await render(<my-component></my-component>);
    expect(root).toHaveShadowRoot();
  });

  it('renders greeting with full name', async () => {
    const { root } = await render(<my-component first="John" middle="Q" last="Doe"></my-component>);
    const greeting = root.shadowRoot.querySelector('.greeting-text');
    expect(greeting).toHaveTextContent('Hello, John Q Doe!');
  });

  it('increments counter when clicked', async () => {
    const { root, waitForChanges } = await render(<my-component></my-component>);
    const incrementBtn = root.shadowRoot.querySelector('.increment-btn') as HTMLButtonElement;

    incrementBtn.click();
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

    expect(root.shadowRoot.querySelector('.count')).toHaveTextContent('2 clicks');
    expect(incrementBtn).toHaveAttribute('disabled');
  });

  it('toggles expanded greeting', async () => {
    const { root, waitForChanges } = await render(<my-component first="Jane"></my-component>);
    const toggleBtn = root.shadowRoot.querySelector('.toggle-btn') as HTMLButtonElement;

    expect(toggleBtn).toHaveTextContent('Expand');
    toggleBtn.click();
    await waitForChanges();

    expect(toggleBtn).toHaveTextContent('Collapse');
    expect(root.shadowRoot.querySelector('.greeting-text')).toHaveTextContent('Nice to meet you!');
  });

  it('emits countChanged event', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(<my-component></my-component>);
    const spy = spyOnEvent('countChanged');
    const incrementBtn = root.shadowRoot.querySelector('.increment-btn') as HTMLButtonElement;

    incrementBtn.click();
    await waitForChanges();

    expect(spy).toHaveReceivedEvent();
    expect(spy).toHaveReceivedEventDetail(1);
  });
});
