# Candidate Search App

The Candidate Search App is a React + TypeScript application built with Vite. It allows users to search for GitHub profiles, save candidates for future reference, and manage a list of saved candidates. This guide provides setup instructions, features, and guidelines for contributors.

---

## 🚀 Features

- **GitHub Profile Search:** Search GitHub users by username.
- **Save Candidates:** Save selected profiles for future reference.
- **Manage Saved Candidates:** View and remove saved candidates.
- **Built with TypeScript:** Type-safe, scalable, and maintainable codebase.
- **Fast Development with Vite:** Instant reloads and optimized builds.

---

## 🛠️ Technologies Used

- **React** for building the user interface.
- **TypeScript** for type-safe development.
- **Vite** for a fast development server and bundler.
- **GitHub API** for fetching user data.

---

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (version 16+)
- **npm** (version 7+)

---

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mauricek12d/Candidate-Search

   Add a GitHub Fine-Grained Personal Access Token

2. **Navigate to GitHub Settings.

Under "Personal Access Tokens," click "Generate new token".

Select "Fine-grained personal access token".

Configure the required permissions for accessing user profiles.

Copy the generated token.

Create a .env file in the root directory and add the following line:

```bash
VITE_GITHUB_TOKEN=your_fine_grained_token_here


