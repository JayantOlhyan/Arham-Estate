# Contributing to Arham Estate

Thank you for your interest in contributing to the **Arham Estate** open-source real estate portal! We welcome contributions from developers, designers, and real estate technologists of all backgrounds.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork the Repository** on GitHub.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/<your-username>/Arham-Estate.git
   cd Arham-Estate
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a topic branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## Development Workflow

- Run the local dev server: `npm run dev` (runs at `http://localhost:3000`).
- Check linting: `npm run lint`.
- Verify production compilation: `npm run build`.

## Coding Standards

- **TypeScript**: Strive for strong typing. Avoid unnecessary `any`.
- **CSS / Styling**: Maintain the design tokens defined in `globals.css` (e.g. `--brand-green`, `--brand-blue`, `--bg-main`).
- **Typography**: Adhere to the Outfit (headings) and Inter (body) typography hierarchy.
- **Accessibility**: Ensure interactive elements have accessible names, proper focus rings, and valid contrast ratios.
- **Commit Messages**: Write clear, descriptive commit messages without arbitrary numbering (e.g., `feat: ...`, `fix: ...`, `style: ...`, `docs: ...`).

## Pull Request Guidelines

1. Ensure the code compiles cleanly with `npm run build`.
2. Keep pull requests focused on a single responsibility.
3. Update relevant documentation or README sections when adding new features or changing workflows.
4. Submit your pull request against the `main` branch with a clear description of the problem and solution.
