# LISDEJ25125_FTO2502B1_Lisa-De-Jongh_DSL02

# Podcast Preview Web Component

This project provides a reusable and encapsulated **Web Component** (`<podcast-preview>`) for displaying a podcast's preview card. It is built with vanilla JavaScript, HTML, and CSS, adhering to modern web standards and best practices for component design.

The component is **stateless**, receiving all its data via HTML attributes, and communicates with the parent application through **custom events**, ensuring it is decoupled and highly reusable.

## Features

-   **Fully Encapsulated:** Uses the **Shadow DOM** to isolate its styles and structure, preventing conflicts with global CSS.
-   **Data-Driven via Attributes:** All podcast data (title, image, genres, etc.) is passed in through simple HTML attributes.
-   **Decoupled Communication:** Fires a `podcast-clicked` custom event upon user interaction, allowing the parent application to handle the logic (e.g., opening a modal).
-   **Reusable:** Can be dropped into any HTML page to display a podcast preview with zero configuration.
-   **No Dependencies:** Built with 100% native Web APIs (no frameworks).
-   **Responsive Design:** Adapts to different screen sizes.
