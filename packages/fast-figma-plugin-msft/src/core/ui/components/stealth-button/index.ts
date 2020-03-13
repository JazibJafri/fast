import { css, customElement, FastElement, html, ref } from "@microsoft/fast-element";

const template = html`
    <button>
        <slot id="glyph" name="glyph"></slot>
        <span><slot id="content"></slot></span>
    </button>
`;

const styles = css`
    :host {
        display: inline-block;
    }

    :host(.has-glyph.has-content) span {
        margin-inline-start: 8px;
    }

    button {
        box-sizing: border-box;
        padding: 0 8px;
        min-width: 30px;
        height: 30px;
        border: none;
        background: var(--neutral-fill-stealth-rest);
        outline: none;
        font-size: inherit;
    }

    button:focus {
        border-color: var(--neutral-outline-rest);
    }
    button:hover {
        background: var(--neutral-fill-stealth-hover);
    }

    button:active {
        background: var(--neutral-fill-stealth-active);
    }
`;

@customElement({
    name: "td-stealth-button",
    template,
    styles,
    shadowOptions: {
        mode: "open",
        delegatesFocus: true,
    },
})
export class StealthButton extends FastElement {
    public glyph: HTMLSlotElement;
    public content: HTMLSlotElement;
    public connectedCallback(): void {
        if (this.hasGlyph()) {
            this.classList.add("has-glyph");
        }

        if (this.hasContent()) {
            this.classList.add("has-content");
        }
    }

    private hasGlyph(): boolean {
        return this.slotHasContent(this.shadowRoot!.querySelector(
            "[id='glyph']"
        ) as HTMLSlotElement);
    }

    private hasContent(): boolean {
        return this.slotHasContent(this.shadowRoot!.querySelector(
            "[id='content']"
        ) as HTMLSlotElement);
    }

    private slotHasContent(slot: HTMLSlotElement): boolean {
        return (
            Array.from(slot.assignedNodes()).filter(node => {
                if (
                    node.nodeType === 3 &&
                    node.nodeValue &&
                    node.nodeValue.trim().length === 0
                ) {
                    // Text node
                    return false;
                }

                return true;
            }).length !== 0
        );
    }
}
