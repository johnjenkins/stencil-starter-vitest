import { Component, Prop, State, Event, EventEmitter, Method, h } from '@stencil/core';
import { format, clamp, pluralize } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  /**
   * Minimum counter value
   */
  @Prop({reflect: true}) min: number = 0;

  /**
   * Maximum counter value
   */
  @Prop({reflect: true}) max: number = 10;

  /**
   * Whether the greeting is expanded
   */
  @State() expanded: boolean = false;

  /**
   * Current counter value
   */
  @State() count: number = 0;

  /**
   * Emitted when the counter changes
   */
  @Event() countChanged: EventEmitter<number>;

  /**
   * Emitted when the greeting is toggled
   */
  @Event() greetingToggled: EventEmitter<boolean>;

  /**
   * Reset the counter to zero
   */
  @Method()
  async reset(): Promise<void> {
    this.count = 0;
    this.countChanged.emit(this.count);
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  private increment = () => {
    this.count = clamp(this.count + 1, this.min, this.max);
    this.countChanged.emit(this.count);
  };

  private decrement = () => {
    this.count = clamp(this.count - 1, this.min, this.max);
    this.countChanged.emit(this.count);
  };

  private toggleGreeting = () => {
    this.expanded = !this.expanded;
    this.greetingToggled.emit(this.expanded);
  };

  render() {
    const name = this.getText();
    const hasName = name.trim().length > 0;

    return (
      <div class="container">
        <div class="greeting" onClick={this.toggleGreeting}>
          {this.expanded ? (
            <p class="greeting-text">
              Hello, World! I'm {hasName ? name : 'Anonymous'}. Nice to meet you!
            </p>
          ) : (
            <p class="greeting-text">Hello{hasName ? `, ${name}` : ''}!</p>
          )}
          <button class="toggle-btn" type="button">
            {this.expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>

        <div class="counter">
          <button class="decrement-btn" onClick={this.decrement} disabled={this.count <= this.min}>
            -
          </button>
          <span class="count">{this.count} {pluralize(this.count, 'click', 'clicks')}</span>
          <button class="increment-btn" onClick={this.increment} disabled={this.count >= this.max}>
            +
          </button>
        </div>
      </div>
    );
  }
}
