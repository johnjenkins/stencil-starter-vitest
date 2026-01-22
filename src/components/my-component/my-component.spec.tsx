import { render, h, describe, it, expect } from '@stencil/vitest';

describe('my-component (spec)', () => {
  it('renders with shadow root', async () => {
    const { root } = await render(<my-component></my-component>);
    expect(root).toHaveShadowRoot();
  });

  it('renders greeting with name', async () => {
    const { root } = await render(<my-component first="Alice" last="Smith"></my-component>);
    const greeting = root.shadowRoot.querySelector('.greeting-text');
    expect(greeting).toHaveTextContent('Hello, Alice Smith!');
  });

  it('updates when props change', async () => {
    const { root, setProps, waitForChanges } = await render(<my-component first="Before"></my-component>);
    expect(root.shadowRoot.querySelector('.greeting-text')).toHaveTextContent('Hello, Before!');

    await setProps({ first: 'After' });
    await waitForChanges();

    expect(root.shadowRoot.querySelector('.greeting-text')).toHaveTextContent('Hello, After!');
  });

  it('matches expected HTML structure', async () => {
    const { root } = await render(<my-component first="Stencil"></my-component>);
    expect(root).toEqualHtml(`
      <my-component min="0" max="10" class="hydrated">
        <mock:shadow-root>
          <div class="container">
            <div class="greeting">
              <p class="greeting-text">
                Hello, Stencil!
              </p>
              <button class="toggle-btn" type="button">
                Expand
              </button>
            </div>
            <div class="counter">
              <button class="decrement-btn" disabled="">
                -
              </button>
              <span class="count">
                0 clicks
              </span>
              <button class="increment-btn">
                +
              </button>
            </div>
          </div>
        </mock:shadow-root>
      </my-component>
    `);
  });

  it('disables decrement button at min value', async () => {
    const { root } = await render(<my-component min={0}></my-component>);
    expect(root.shadowRoot.querySelector('.decrement-btn')).toHaveAttribute('disabled');
  });
});
