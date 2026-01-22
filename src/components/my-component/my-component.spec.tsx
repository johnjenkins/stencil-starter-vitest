import { render, h, describe, it, expect } from '@stencil/vitest';

describe('my-component (node "browser")', () => {
  describe('initial rendering', () => {
    it('renders with shadow root', async () => {
      const { root } = await render(<my-component></my-component>);
      expect(root).toHaveShadowRoot();
    });

    it('has correct container structure', async () => {
      const { root } = await render(<my-component></my-component>);
      expect(root.shadowRoot.querySelector('.container')).not.toBeNull();
      expect(root.shadowRoot.querySelector('.greeting')).not.toBeNull();
      expect(root.shadowRoot.querySelector('.counter')).not.toBeNull();
    });

    it('renders with default collapsed state', async () => {
      const { root } = await render(<my-component first="Test"></my-component>);
      const toggleBtn = root.shadowRoot.querySelector('.toggle-btn');
      expect(toggleBtn).toHaveTextContent('Expand');
    });

    it('renders counter buttons', async () => {
      const { root } = await render(<my-component></my-component>);
      expect(root.shadowRoot.querySelector('.increment-btn')).not.toBeNull();
      expect(root.shadowRoot.querySelector('.decrement-btn')).not.toBeNull();
    });
  });

  describe('name formatting', () => {
    it('renders empty greeting when no name provided', async () => {
      const { root } = await render(<my-component></my-component>);
      const greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent('Hello!');
    });

    it('renders first name only', async () => {
      const { root } = await render(<my-component first="Alice"></my-component>);
      const greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent('Hello, Alice!');
    });

    it('renders first and last name', async () => {
      const { root } = await render(<my-component first="Alice" last="Smith"></my-component>);
      const greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent('Hello, Alice Smith!');
    });

    it('renders full name with middle', async () => {
      const { root } = await render(<my-component first="Alice" middle="B" last="Smith"></my-component>);
      const greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent('Hello, Alice B Smith!');
    });
  });

  describe('props', () => {
    it('accepts min prop', async () => {
      const { root } = await render(<my-component min={5}></my-component>);
      expect(root).toEqualAttribute('min', '5');
    });

    it('accepts max prop', async () => {
      const { root } = await render(<my-component max={20}></my-component>);
      expect(root).toEqualAttribute('max', '20');
    });

    it('updates when props change', async () => {
      const { root, setProps, waitForChanges } = await render(<my-component first="Before"></my-component>);

      let greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent('Hello, Before!');

      await setProps({ first: 'After' });
      await waitForChanges();

      greeting = root.shadowRoot.querySelector('.greeting-text');
      expect(greeting).toHaveTextContent('Hello, After!');
    });
  });

  describe('HTML structure', () => {
    it('matches expected HTML when collapsed', async () => {
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

    it('renders correct classes on elements', async () => {
      const { root } = await render(<my-component></my-component>);
      expect(root.shadowRoot.querySelector('.container')).toHaveClass('container');
      expect(root.shadowRoot.querySelector('.greeting')).toHaveClass('greeting');
      expect(root.shadowRoot.querySelector('.counter')).toHaveClass('counter');
    });
  });

  describe('button states', () => {
    it('disables decrement at min value', async () => {
      const { root } = await render(<my-component min={0}></my-component>);
      const decrementBtn = root.shadowRoot.querySelector('.decrement-btn');
      expect(decrementBtn).toHaveAttribute('disabled');
    });

    it('enables increment when below max', async () => {
      const { root } = await render(<my-component max={10}></my-component>);
      const incrementBtn = root.shadowRoot.querySelector('.increment-btn');
      expect(incrementBtn).not.toHaveAttribute('disabled');
    });

    it('has correct button types', async () => {
      const { root } = await render(<my-component></my-component>);
      const toggleBtn = root.shadowRoot.querySelector('.toggle-btn');
      expect(toggleBtn).toEqualAttribute('type', 'button');
    });
  });

  describe('counter display', () => {
    it('shows correct initial count text', async () => {
      const { root } = await render(<my-component></my-component>);
      const count = root.shadowRoot.querySelector('.count');
      expect(count).toHaveTextContent('0 clicks');
    });
  });

  describe('unmount', () => {
    it('can unmount cleanly', async () => {
      const { root, unmount } = await render(<my-component first="Test"></my-component>);
      expect(root).toHaveShadowRoot();
      await unmount();
    });
  });
});
