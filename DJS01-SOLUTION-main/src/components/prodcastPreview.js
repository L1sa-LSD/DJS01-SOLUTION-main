
/**
 * @file A reusable, encapsulated Web Component for displaying a podcast preview.
 * @author [Your Name]
 *
 * @property {string} title - The title of the podcast.
 * @property {string} cover-image - The URL for the podcast's cover image.
 * @property {string} seasons - The number of seasons.
 * @property {string} genres - A comma-separated string of genre names.
 * @property {string} last-updated - The ISO date string for the last update.
 * @property {string} data-id - The unique identifier for the podcast.
 *
 * @fires podcast-clicked - A custom event dispatched when the component is clicked. The event detail contains the podcast's unique ID.
 */

const template = document.createElement('template');
template.innerHTML = `
  <style>
    /*
      These styles are encapsulated within the Shadow DOM. They won't leak out,
      and global styles won't leak in, ensuring the component is predictable.
    */
    :host {
      display: block;
      cursor: pointer;
      transition: transform 0.2s;
    }

    :host(:hover) {
      transform: scale(1.02);
    }

    .card {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
    }

    .card-image {
      width: 100%;
      border-radius: 6px;
      object-fit: cover;
      aspect-ratio: 1 / 1;
    }

    .card-title {
      margin: 0.75rem 0 0.25rem;
      font-size: 1.1rem;
      color: #111;
    }

    .card-meta, .updated-text {
      font-size: 0.8rem;
      color: #555; /* Replicating --grey-text */
    }

    .tags {
      margin: 0.5rem 0;
      line-height: 1.5;
    }

    .tag {
      background: #eee;
      padding: 0.3rem 0.6rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      display: inline-block;
      font-size: 0.8rem;
    }

    .card-footer {
        margin-top: auto;
        padding-top: 0.5rem;
    }
  </style>
  <div class="card">
    <img class="card-image" src="" alt="Podcast cover" />
    <h3 class="card-title"></h3>
    <p class="card-meta"></p>
    <div class="tags"></div>
    <div class="card-footer">
        <p class="updated-text"></p>
    </div>
  </div>
`;

class PodcastPreview extends HTMLElement {
  /**
   * Constructs the component and attaches the Shadow DOM.
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * A private helper method to format an ISO date string into a human-readable format.
   * @param {string} dateStr - The ISO date string to format.
   * @returns {string} A formatted date string, e.g., "Updated: November 3, 2022".
   * @private
   */
  _formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `Updated: ${date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`;
  }

  /**
   * Renders the component's content based on its attributes.
   * This function populates the Shadow DOM with the provided data.
   */
  render() {
    const title = this.getAttribute('title');
    const seasons = this.getAttribute('seasons');
    const genres = this.getAttribute('genres')?.split(',') || [];

    this.shadowRoot.querySelector('.card-image').src = this.getAttribute('cover-image');
    this.shadowRoot.querySelector('.card-image').alt = `${title} cover`;
    this.shadowRoot.querySelector('.card-title').textContent = title;
    this.shadowRoot.querySelector('.card-meta').textContent = `${seasons} season${parseInt(seasons, 10) !== 1 ? 's' : ''}`;
    this.shadowRoot.querySelector('.updated-text').textContent = this._formatDate(this.getAttribute('last-updated'));

    const tagsContainer = this.shadowRoot.querySelector('.tags');
    tagsContainer.innerHTML = genres.map(g => `<span class="tag">${g.trim()}</span>`).join('');
  }

  /**
   * Lifecycle callback invoked when the component is added to the DOM.
   * It triggers the initial render and sets up the click event listener.
   */
  connectedCallback() {
    this.render();
    this.addEventListener('click', this._handleClick);
  }

  /**
   * Lifecycle callback invoked when the component is removed from the DOM.
   * It cleans up the event listener to prevent memory leaks.
   */
  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
  }

  /**
   * Handles the click event on the component.
   * It dispatches a 'podcast-clicked' custom event with the podcast ID in the detail payload.
   * @private
   */
  _handleClick() {
    const podcastId = this.getAttribute('data-id');
    this.dispatchEvent(
      new CustomEvent('podcast-clicked', {
        bubbles: true, // Allows the event to bubble up through the DOM
        composed: true, // Allows the event to cross the Shadow DOM boundary
        detail: { id: podcastId },
      })
    );
  }
}

// Defines the custom element, making <podcast-preview> available in HTML.
customElements.define('podcast-preview', PodcastPreview);